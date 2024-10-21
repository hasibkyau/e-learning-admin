import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SnackbarNotificationComponent} from "./components/ui/snackbar-notification/snackbar-notification.component";
import {MessageDialogComponent} from "./components/ui/message-dialog/message-dialog.component";
import {ConfirmDialogComponent} from "./components/ui/confirm-dialog/confirm-dialog.component";
import {BottomSheetViewComponent} from "./components/ui/bottom-sheet-view/bottom-sheet-view.component";
import {MaterialModule} from "../material/material.module";


@NgModule({
  declarations: [
    SnackbarNotificationComponent,
    MessageDialogComponent,
    ConfirmDialogComponent,
    BottomSheetViewComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
  ],
  exports: [
    SnackbarNotificationComponent,
    MessageDialogComponent,
    ConfirmDialogComponent,
    BottomSheetViewComponent
  ],
  providers: []
})
export class SharedModule {
}
