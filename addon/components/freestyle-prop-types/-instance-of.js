import Ember from 'ember';
import layout from '../../templates/components/freestyle-prop-types/-instance-of';

export default Ember.Component.extend({
  layout,
  instanceType: '',
  didReceiveAttrs() {
    this.set('instanceType', this.get('propDefinition.type.typeDef').toString());
  },
});
