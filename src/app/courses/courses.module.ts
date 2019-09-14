import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import {
  CoursesCardListComponent
} from './courses-card-list/courses-card-list.component';
import {
  EditCourseDialogComponent
} from './edit-course-dialog/edit-course-dialog.component';

import { CourseComponent } from './course/course.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import {
  EntityDataService,
  EntityDefinitionService,
  EntityMetadataMap
} from '@ngrx/data';
import { compareCourses } from './model/course';
import { compareLessons } from './model/lesson';

import { CoursersResolver } from './services/courses.resolver';
import { CoursesDataService } from './services/course-data.service';
import { MaterialModule } from '../shared/materia.module';

export const coursesRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    resolve: {
      courses: CoursersResolver,
    },

  },
  {
    path: ':courseUrl',
    component: CourseComponent,
    resolve: {
      lessos: CoursersResolver,
    },
  }
];

const entityMetadata: EntityMetadataMap = {
  Course: {
    sortComparer: compareCourses,
    entityDispatcherOptions: {
      optimisticUpdate: true,
    }
  },
  Lesson: {
    sortComparer: compareLessons,
  }
};

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule.forChild(coursesRoutes),
  ],
  declarations: [
    HomeComponent,
    CoursesCardListComponent,
    EditCourseDialogComponent,
    CourseComponent,
  ],
  exports: [
    HomeComponent,
    CoursesCardListComponent,
    EditCourseDialogComponent,
    CourseComponent,
  ],
  entryComponents: [EditCourseDialogComponent],
})
export class CoursesModule {
  constructor(
    private entityDefinitionService: EntityDefinitionService,
    private entityDataService: EntityDataService,
    private coursesDataService: CoursesDataService,
  ) {
    entityDefinitionService.registerMetadataMap(entityMetadata);
    entityDataService.registerServices({
      'Course': coursesDataService,
    });
  }
}
