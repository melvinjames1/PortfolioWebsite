import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GothicCursorComponent } from './gothic-cursor.component';

describe('GothicCursorComponent', () => {
  let component: GothicCursorComponent;
  let fixture: ComponentFixture<GothicCursorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GothicCursorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GothicCursorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
