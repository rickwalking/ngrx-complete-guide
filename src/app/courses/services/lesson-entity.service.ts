import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory
} from '@ngrx/data';
import { Lesson } from '../model/lesson';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LessonEntityService extends EntityCollectionServiceBase<Lesson> {
  constructor(
    serviceElementsFactory: EntityCollectionServiceElementsFactory,
  ) {
    super('Lesson', serviceElementsFactory);
  }
}
