/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CategoryServiesService } from './categoryServies.service';

describe('Service: CategoryServies', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CategoryServiesService]
    });
  });

  it('should ...', inject([CategoryServiesService], (service: CategoryServiesService) => {
    expect(service).toBeTruthy();
  }));
});
