import { NgModule } from '@angular/core';
import {
  MatMenuModule,
  MatIconModule,
  MatSidenavModule,
  MatProgressSpinnerModule,
  MatListModule,
  MatToolbarModule,
  MatButtonModule,
  MatTabsModule,
  MatCardModule,
  MatDatepickerModule,
  MatSelectModule,
  MatDialogModule,
  MatSlideToggleModule,
  MatSortModule,
  MatPaginatorModule,
  MatInputModule,
  MatTableModule
} from '@angular/material';
import { MatMomentDateModule } from '@angular/material-moment-adapter';

@NgModule({
    imports: [
      MatMenuModule,
      MatIconModule,
      MatSidenavModule,
      MatProgressSpinnerModule,
      MatListModule,
      MatToolbarModule,
      MatButtonModule,
      MatCardModule,
      MatTabsModule,
      MatInputModule,
      MatTableModule,
      MatPaginatorModule,
      MatSortModule,
      MatSlideToggleModule,
      MatDialogModule,
      MatSelectModule,
      MatDatepickerModule,
      MatMomentDateModule,
    ],
    exports: [
      MatMenuModule,
      MatIconModule,
      MatSidenavModule,
      MatProgressSpinnerModule,
      MatListModule,
      MatToolbarModule,
      MatButtonModule,
      MatCardModule,
      MatTabsModule,
      MatInputModule,
      MatTableModule,
      MatPaginatorModule,
      MatSortModule,
      MatSlideToggleModule,
      MatDialogModule,
      MatSelectModule,
      MatDatepickerModule,
      MatMomentDateModule,
    ],
})
export class MaterialModule {
  //
}
