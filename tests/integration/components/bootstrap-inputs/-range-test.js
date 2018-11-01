import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find, findAll } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import a11yAudit from 'ember-a11y-testing/test-support/audit';

module('Integration | Component | Bootstrap Inputs | Range', function(hooks) {
  setupRenderingTest(hooks);

  test('it has no a11y errors', async function(assert) {
    await render(hbs`{{bootstrap-inputs/-range label='label' value=1}}`);
    return a11yAudit(this.$()).then(() => {
      assert.ok(true, 'no a11y errors found!');
    });
  });

  test('it renders a label and input', async function(assert) {
    await render(hbs`{{bootstrap-inputs/-range label='label' value=1}}`);
    assert.equal(findAll('input[type="range"]').length, 1);
    assert.equal(findAll('label').length, 1);
  });

  test('it uses value', async function(assert) {
    this.set('value', 1);
    await render(hbs`{{bootstrap-inputs/-range label='label' value=value}}`);
    assert.equal(find('input[type="range"]').value, this.get('value'));
  });

  test('it uses label', async function(assert) {
    this.set('label', 'Some label');
    await render(hbs`{{bootstrap-inputs/-range label=label value=1}}`);
    assert.equal(find('label').textContent.trim(), this.get('label'));
  });
});