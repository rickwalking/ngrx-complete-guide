import {
  Component,
  OnInit,
  ChangeDetectionStrategy
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Course } from '../model/course';
import { Observable } from 'rxjs';
import { Lesson } from '../model/lesson';

import {
  delay,
  map,
  tap,
   withLatestFrom
} from 'rxjs/operators';

import { LessonEntityService  } from '../services/lesson-entity.service';
import { CourseEntityService  } from '../services/course-entity.service';

@Component({
  selector: 'course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseComponent implements OnInit {
  public course$: Observable<Course>;
  public lessons$: Observable<Lesson[]>;
  public loading$: Observable<boolean>;

  public displayedColumns: string[] =
    ['seqNo', 'description', 'duration'];
  public nextPage: number = 0;

  constructor(
    private route: ActivatedRoute,
    private lessonsService: LessonEntityService,
    private courseEntityService: CourseEntityService,
  ) {
    //
  }

  ngOnInit(): void {
    const courseUrl = this.route.snapshot.paramMap.get('courseUrl');
    this.course$ = this.courseEntityService.entities$
      .pipe(
        map((course) => course.find((courseValue) => {
          return courseValue.url === courseUrl;
          }
        )),
      );
    this.lessons$ = this.lessonsService.entities$
      .pipe(
        withLatestFrom(this.course$),
        tap(([lessons, course]) => {
          if (this.nextPage === 0) {
            this.loadLessonsPage(course);
          }
        }),
        map(([lessons, course]) => {
          return lessons.filter((lesson) =>
            lesson.courseId === course.id
          );
        }),
      );

    this.loading$ = this.lessonsService.loading$
      .pipe(
        delay(0),
      );
  }

  loadLessonsPage(course: Course): void {
    this.lessonsService.getWithQuery({
      'courseId': course.id.toString(),
      'pageNumber': this.nextPage.toString(),
      'pageSize': '3',
    });

    this.nextPage += 1;
  }
}
