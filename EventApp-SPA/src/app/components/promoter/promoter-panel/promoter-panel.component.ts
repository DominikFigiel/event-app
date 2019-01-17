import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-promoter-panel',
  templateUrl: './promoter-panel.component.html',
  styleUrls: ['./promoter-panel.component.css']
})
export class PromoterPanelComponent implements OnInit {
  option = 'management';

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.option = 'management';
    this.setOption();
  }

  setOption() {
    if (this.route.snapshot.params['option']) {
      switch (this.route.snapshot.params['option']) {
        case 'management': {
          this.option = 'management';
            break;
        }
        case 'history': {
          this.option = 'history';
            break;
        }
        case 'new-event': {
          this.option = 'new';
            break;
        }
        default: {
          this.option = 'management';
            break;
        }
      }
    }
  }

  managementMode() {
    return this.option === 'management';
  }

  historyMode() {
    return this.option === 'history';
  }

  newMode() {
    return this.option === 'new';
  }

  setManagementMode() {
    this.option = 'management';
  }

  setHistoryMode() {
    this.option = 'history';
  }

  setNewMode() {
    this.option = 'new';
  }

}
