import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from './app.component';
import { RecipesComponent } from './components/recipes/recipes.component';
import { RecipeComponent } from './components/recipe/recipe.component';
import { TagListComponent } from './components/tag-list/tag-list.component';
import { TagFilterComponent } from './components/tag-filter/tag-filter.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FilterMiddlewareComponent } from './components/filter-middleware/filter-middleware.component';
import { CreateRecipeComponent } from './components/popups/create-recipe/create-recipe.component';

@NgModule({
  declarations: [
    AppComponent,
    RecipesComponent,
    RecipeComponent,
    TagListComponent,
    TagFilterComponent,
    FilterMiddlewareComponent,
    CreateRecipeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
