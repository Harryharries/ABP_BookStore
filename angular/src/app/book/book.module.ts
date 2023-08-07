import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { BookRoutingModule } from './book-routing.module';
import { BookComponent } from './book.component';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { BookEffects } from './store/book.effects';
import { bookReducer } from './store/book.reducer';
import { bookFeatureKey } from './store/book.selectors';
@NgModule({
  declarations: [BookComponent],
  imports: [
    // StoreModule.forFeature( bookFeatureKey, bookReducer),
    // EffectsModule.forFeature([BookEffects]),
    BookRoutingModule,
    NgbDatepickerModule,
    SharedModule
  ]
})
export class BookModule { }
