import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-tabs/paper-tabs.js';
import '@polymer/font-roboto/roboto.js';
import '../ck-quotepage/ck-quotepage.js';

class QuoteCenterApp extends PolymerElement {
  static get template() {
    return html`
      <style>
      :host {
        font: 1em 'Courier', sans-serif;
        font-weight: 300;
        color: var(--paper-indigo-900);
      }
      </style>

      <ck-quotepage app-storage-key="jimrohn-quotes" data-url="/data/JimRohn.json"></ck-quotepage>
      `;
  }

  static get is() { return "quote-center-app"; }
  static get properties() {
    return {
    };
  }
}

window.customElements.define(QuoteCenterApp.is, QuoteCenterApp);
