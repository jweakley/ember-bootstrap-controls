import { assert } from '@ember/debug';
import Component from '@ember/component';
import { task, didCancel } from 'ember-concurrency';
import layout from '../templates/components/bootstrap-form';
import PropTypeMixin, { PropTypes } from 'ember-prop-types';

export default Component.extend(PropTypeMixin, {
  layout,
  tagName: 'form',

  init() {
    this.propTypes = {
      isEditing: PropTypes.bool,
      save: PropTypes.func.isRequired,
      cancel: PropTypes.func,
    };
    this._super(...arguments);
  },

  getDefaultProps() {
    return { isEditing: false };
  },

  _isSaving: false,
  _isCanceling: false,

  saveTask: task(function * () {
    try {
      this.set('_isSaving', true);
      const saveAction = this.get('save');

      if (typeof saveAction === 'function') {
        const rval = yield saveAction(...arguments);

        this.set('isEditing', false);

        return rval;
      } else {
        assert('Save function required');
      }
    } finally {
      this.set('_isSaving', false);
    }
  }).restartable(),

  cancelTask: task(function * () {
    try {
      this.set('_isCanceling', true);

      const cancelAction = this.get('cancel');

      if (typeof cancelAction === 'function') {
        yield cancelAction(...arguments);
      }

      this.set('isEditing', false);
    } finally {
      this.set('_isCanceling', false);
    }
  }),

  actions: {
    edit() {
      this.set('isEditing', true);
    },

    save() {
      return this.get('saveTask').perform(...arguments).catch(e => {
        if (!didCancel(e)) {
          throw e;
        }
      });
    },

    cancel() {
      return this.get('cancelTask').perform(...arguments).catch(e => {
        if (!didCancel(e)) {
          throw e;
        }
      });
    }
  }
});
