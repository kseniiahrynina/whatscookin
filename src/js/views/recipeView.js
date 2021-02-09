import View from './View.js';
import icons from 'url:../../img/icons.svg';
import {Fraction} from 'fractional';

class RecipeView extends View {
    _parentElement = document.querySelector('.recipe');
    _errorMessage = `Unfortunately, we weren't able to find any recipes 😔`;
    _message = '';

    addHandlerRender(handler) {
        ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handler));
    };

    addHandlerUpdateServings(handler) {
        this._parentElement.addEventListener('click', function(e) {
            const btn = e.target.closest('.btn--update-servings');
            if (!btn) return;
            const { updateTo } = btn.dataset;
            if(+updateTo > 0) handler(+updateTo);
        });
    };

    addHandlerAddBookmark(handler) {
        this._parentElement.addEventListener('click', function(e) {
            const btn = e.target.closest('.btn--bookmark');
            if(!btn) return;
            handler();
        });
    };

    _generateMarkup() {
        return `
            <figure class="recipe__fig">
                <div class="recipe__header">

                    <img src="${this._data.image}" alt="${this._data.title}" class="recipe__img" />

                <div class="recipe__details">

                    <h1 class="recipe__title">
                    <span>${this._data.title}</span>
                    </h1>

                    <button class="btn--round btn--bookmark recipe__button">
                        <svg class="">
                        <use href="${icons}#icon-bookmark${this._data.bookmarked ? '-fill' : ''}"></use>
                        </svg>
                    </button>

                    <div class="recipe__info-block">

                    <div class="recipe__info">
                        <svg class="recipe__info-icon">
                        <use href="${icons}#icon-clock"></use>
                        </svg>
                        <span class="recipe__info-data recipe__info-data--minutes">${this._data.cookingTime}</span>
                        <span class="recipe__info-text">minutes</span>
                    </div>

                    <div class="recipe__info">
                        <svg class="recipe__info-icon">
                        <use href="${icons}#icon-users"></use>
                        </svg>
                        <span class="recipe__info-data recipe__info-data--people">${this._data.servings}</span>
                        <span class="recipe__info-text">servings</span>

                    <div class="recipe__info-buttons">
                        <button class="btn--tiny btn--update-servings" data-update-to="${this._data.servings - 1}">
                            <svg>
                            <use href="${icons}#icon-minus-circle"></use>
                            </svg>
                        </button>
                        <button class="btn--tiny btn--update-servings" data-update-to="${this._data.servings + 1}">
                            <svg>
                            <use href="${icons}#icon-plus-circle"></use>
                            </svg>
                        </button>
                    </div>
                    </div>
                </div>


                
                <div class="recipe__details">
                    
                </div>

                
                </div>
                </figure>



                <div class="recipe__ingredients">
                <h2 class="heading--2">Ingredients</h2>
                <ul class="recipe__ingredient-list">
                ${this._data.ingredients
                    .map(this._generateMarkupIngredient)
                .join('')}
                    
                </div>

                <div class="recipe__directions">
                <p class="recipe__directions-text">
                    This recipe was designed and tested by
                    <span class="recipe__publisher">${this._data.publisher}</span>.
                </p>
                <a
                    class="btn--small recipe__btn"
                    href="${this._data.sourceUrl}"
                    target="_blank"
                >
                    <span>Directions</span>
                    <svg class="search__icon">
                    <use href="${icons}#icon-arrow-right"></use>
                    </svg>
                </a>
                </div>
       `;
    }

    _generateMarkupIngredient(ing) {
        return `
            <li class="recipe__ingredient">
            <svg class="recipe__icon">
                <use href="${icons}#icon-check"></use>
            </svg>
            <div class="recipe__quantity">${ing.quantity ? new Fraction(ing.quantity).toString() : ''}</div>
            <div class="recipe__description">
                <span class="recipe__unit">${ing.unit}</span>
                ${ing.description}
            </div>
            </li>
        `;
    }
}

export default new RecipeView();
