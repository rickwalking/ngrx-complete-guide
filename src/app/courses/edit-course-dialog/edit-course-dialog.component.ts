import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Course} from '../model/course';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../reducers/reducers';
import { courseUpdated } from '../course.actions';
import { Update } from '@ngrx/entity';

@Component({
  selector: 'course-dialog',
  templateUrl: './edit-course-dialog.component.html',
  styleUrls: ['./edit-course-dialog.component.css']
})
export class EditCourseDialogComponent {

  form: FormGroup;

  dialogTitle: string;

  course: Course;

  mode: 'create' | 'update';

  loading$: Observable<boolean>;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditCourseDialogComponent>,
    private store: Store<AppState>,
    @Inject(MAT_DIALOG_DATA) data,
  ) {
    this.dialogTitle = data.dialogTitle;
    this.course = data.course;
    this.mode = data.mode;

    const formControls = {
      description: ['', Validators.required],
      category: ['', Validators.required],
      longDescription: ['', Validators.required],
      promo: ['', []]
    };

    if (this.mode === 'update') {
      this.form = this.fb.group(formControls);
      this.form.patchValue({...data.course});
      return;
    }

    if (this.mode === 'create') {
      this.form = this.fb.group({
        ...formControls,
        url: ['', Validators.required],
        iconUrl: ['', Validators.required]
      });
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    const course: Course = {
      ...this.course,
      ...this.form.value
    };

    this.store.dispatch(courseUpdated({
      course: {
        id: course.id,
        changes: course,
      }
    }));

    this.dialogRef.close();
  }
}
