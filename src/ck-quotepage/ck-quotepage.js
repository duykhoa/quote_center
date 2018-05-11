import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/iron-flex-layout/iron-flex-layout.js';
import '@polymer/iron-pages/iron-pages.js';
import '@polymer/app-storage/app-indexeddb-mirror/app-indexeddb-mirror.js';
import '@polymer/paper-tabs/paper-tabs.js';
import '@polymer/paper-button/paper-button.js';
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

      iron-pages {
        @apply --layout-flex;
        flex-basis: 100%;
      }

      [role="quote"] {
        padding: 10px;
        font-size: 1.5em;
        line-height: 1.4em;
      }

      [role="status"] {
        padding: 5px;
        text-align: right;
      }

      paper-button:not([disabled]) {
        --paper-button-ink-color: var(--paper-yellow-50);
        background-color: var(--paper-green-a100);
        color: #fff;
      }

      paper-button[random] {
        background-color: var(--google-blue-300);
        color: #fff;
      }

      .buttons-wrapper {
        width: 100%;
        @apply --layout-horizontal;
      }

      [role="navigation"] {
        width: 100%;
      }
    </style>

    <iron-ajax auto="" url="{{dataUrl}}" method="GET" handle-as="json" last-response="{{quotes}}"></iron-ajax>

    <app-indexeddb-mirror key="{{appStorageKey}}" data="{{quotes}}" persisted-data="{{cacheQuotes}}"></app-indexeddb-mirror>

    <iron-pages selected="{{selected}}">
      <template is="dom-repeat" items="[[cacheQuotes.quotes]]">
        <div role="quote">{{item.body}}</div>
      </template>
    </iron-pages>

    <div role="navigation">
      <div class="buttons-wrapper">
        <paper-button disabled="[[noPrevPage(selected)]]" on-click="prevQuote">Previous</paper-button>
        <paper-button disabled="[[noNextPage(selected, cacheQuotes)]]" on-click="nextQuote">Next</paper-button>
        <paper-button random="" raised="" on-click="random">Randomize</paper-button>
      </div>

      <div role="status">
        Quote [[inc(selected, 1)]] of [[lengthOf(cacheQuotes)]]
      </div>
    </div>
  `;
  }

  static get is() { return 'ck-quotepage'; }
  static get properties() {
    return {
      appStorageKey: {
        type: String,
        value: "cara-iu-vau"
      },
      dataUrl: {
        type: String
      },
      selected: {
        type: Number,
        value: 0
      }
    };
  }

  nextQuote() {
    this.selected += 1;
  }

  prevQuote() {
    this.selected -= 1;
  }

  lengthOf(cacheQuotes) {
    return cacheQuotes.quotes.length;
  }

  noNextPage(selected, cacheQuotes) {
    if (cacheQuotes) {
      return selected >= this.lengthOf(this.cacheQuotes);
    }
  }

  noPrevPage(selected) {
    return this.selected <= 0;
  }

  inc(value, by) {
    return value + by;
  }

  random() {
    this.selected = Math.round(Math.random() * this.lengthOf(this.cacheQuotes));
  }
}

window.customElements.define(CkQuotepage.is, CkQuotepage);
