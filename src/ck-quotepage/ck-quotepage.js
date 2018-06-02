import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import {microTask} from '@polymer/polymer/lib/utils/async.js';

import '@polymer/iron-flex-layout/iron-flex-layout.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-spinner/paper-spinner.js';
/** @polymerElement */
/*
  appStorageKey
  dataURL
*/
class CkQuotepage extends PolymerElement {
  static get template() {
    return html`
    <style>
      :host {
        min-height: 100vh;
        @apply --layout-horizontal;
        @apply --layout-wrap;
        @apply --layout-center-aligned;
      }

      paper-button[random] {
        background-color: var(--paper-teal-300);
        color: #fff;
      }

      .buttons-wrapper {
        width: 100%;
        @apply --layout-horizontal;
      }

      [role='navigation'] {
        width: 100%;
      }

      p {
        font-size: 1.4em;
        padding: 10px;
        line-height: 1.2em;
      }

      h5 {
        text-align: right;
      }

      .loading-wrapper {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 10001;
        background: rgba(0, 0, 0, 0.7);
        @apply --layout-horizontal;
        @apply --layout-center-justified;
        @apply --layout-center;
      }
    </style>

    <div class="loading-wrapper" hidden$="[[!loading]]">
      <paper-spinner active="[[loading]]"></paper-spinner>
    </div>

    <div>
      <p>[[randomQuote.body]]</p>
      <h5>[[randomQuote.author]]</h5>
    </div>

    <div role="navigation">
      <div class="buttons-wrapper">
        <paper-button random on-tap="random">Randomize</paper-button>
      </div>
    </div>
  `;
  }

  static get is() { return 'ck-quotepage'; }
  static get properties() {
    return {
      dbKey: {
        type: String
      },

      randomQuote: {
        type: Number,
        value: 0
      },

      quotes: {
        type: Array
      },

      loading: {
        type: Boolean,
        value: true
      }
    };
  }

  static get observers() {
    return [];
  }

  random() {
    let selected = Math.floor(Math.random() * this.quotes.length);
    this.randomQuote = this.quotes[selected];
  }

  updateUI(quotes) {
    this.quotes = quotes;
    this.random();
    this.loading = false;
  }

  constructor() {
    super();
    firebase.database()
      .ref("/quotes")
      .once("value").then((snap) =>  {
        this.updateUI(snap.val());
      });
  }
}

window.customElements.define(CkQuotepage.is, CkQuotepage);
