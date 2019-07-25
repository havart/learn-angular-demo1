import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { SideBarService } from '../../../services/side-bar.service';
import { LocalStorageService } from '../../../services/local-storage.service';
import { USERNAME } from './tool-bar.constants';

@Component({
    selector: 'app-tool-bar-operator',
    templateUrl: './tool-bar-operator.component.html',
    styleUrls: ['./tool-bar-operator.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolBarOperatorComponent implements OnInit {
    userName: string;
    private sideWorks = false;

    constructor(private sideBarService: SideBarService, private localStorageService: LocalStorageService) {}

    ngOnInit() {
        this.userName = this.localStorageService.getUser()[USERNAME];
    }

    sideBarToggle(): void {
        this.sideWorks = !this.sideWorks;
        this.sideBarService.sideWorks$.next(this.sideWorks);
    }
}
