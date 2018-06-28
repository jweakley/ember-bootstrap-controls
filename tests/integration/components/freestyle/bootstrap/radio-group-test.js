import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('freestyle/bootstrap/radio-group', 'Integration | Component | freestyle/bootstrap/radio group', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{freestyle/bootstrap/radio-group}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#freestyle/bootstrap/radio-group}}
      template block text
    {{/freestyle/bootstrap/radio-group}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});