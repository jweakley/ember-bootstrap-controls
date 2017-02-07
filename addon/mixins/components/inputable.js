import Ember from 'ember';
import generateUUID from 'ember-bootstrap-controls/utils/generate-uuid';

export default Ember.Mixin.create({
  errors: null,
  hasSuccess: null,
  hasWarning: null,
  disabled: false,

  hasError: Ember.computed.alias('errors.length'),

  inputId: Ember.computed(function() {
    return `bootstrap-component-${generateUUID()}`;
  })
});