'use babel';

import AtomJavascriptSnippetsView from './atom-javascript-snippets-view';
import { CompositeDisposable } from 'atom';

export default {

  atomJavascriptSnippetsView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.atomJavascriptSnippetsView = new AtomJavascriptSnippetsView(state.atomJavascriptSnippetsViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.atomJavascriptSnippetsView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-javascript-snippets:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.atomJavascriptSnippetsView.destroy();
  },

  serialize() {
    return {
      atomJavascriptSnippetsViewState: this.atomJavascriptSnippetsView.serialize()
    };
  },

  toggle() {
    console.log('AtomJavascriptSnippets was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
