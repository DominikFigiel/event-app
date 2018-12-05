import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
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
        case 'approval': {
          this.option = 'approval';
            break;
        }
        case 'promotion': {
          this.option = 'promotion';
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

  approvalMode() {
    return this.option === 'approval';
  }

  promotionMode() {
    return this.option === 'promotion';
  }

  setManagementMode() {
    this.option = 'management';
  }

  setApprovalMode() {
    this.option = 'approval';
  }

  setPromotionMode() {
    this.option = 'promotion';
  }

}
