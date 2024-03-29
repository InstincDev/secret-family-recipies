import { useContext, useEffect, useState } from "react";
import { fetchRecipes } from "../../utils/serverRequests.js";
import { RecipeAPIContext } from "../../utils/RecipeAPIContext.jsx";
import useLocalStorage from "../../utils/useLocalStorage.jsx";
import NavBar from "../../components/NavBar/NavBar";
import Favorites from "../../components/Sliders/User/Favorites/Favorites";
import FamilyGroups from "../../components/Sliders/User/FamilyGroups/FamilyGroups";
import RecipeSlide from "../../components/Sliders/RecipeSlide";





const HomePage = ({ user }) => {
    const { recipeData, setRecipeData } = useContext(RecipeAPIContext);
    // const [sliderTypes, setSliderTypes] = useState([]);
    const [areaTypes, setAreaTypes] = useLocalStorage("areaTypes",[]);
    const [categoryTypes, setCategoryTypes] = useLocalStorage("categoryTypes",[]);
    const [ingredientTypes, setIngredientTypes] = useLocalStorage("ingredientTypes",[]);
    const [tagTypes, setTagTypes] = useLocalStorage("tagTypes",[]);
    const [favoriteTypes, setFavoriteTypes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if(areaTypes.length == 0 || categoryTypes.length == 0 || ingredientTypes.length == 0 || tagTypes.length == 0 || recipeData == undefined){ getSliderTypes(user)};
    }, [user, areaTypes, categoryTypes, ingredientTypes, tagTypes, recipeData]);

    const getSliderTypes = async (currentUser) => {
        try {
            const recipes = await fetchRecipes();
            const data = recipes.data;
            setRecipeData(data);

            const areaSet = new Set();
            const categorySet = new Set();
            const ingredientSet = new Set();
            const tagSet = new Set();
            const favoritesSet = []

            for (const recipe of data) {
                if (recipe.area != null) {
                    areaSet.add(recipe.area);
                }
                if (recipe.ingredient != null) {
                    for (const ingre of recipe.ingredient) {
                        ingredientSet.add(ingre.ingredient);
                    }
                }
                if (recipe.category != null) {
                    categorySet.add(recipe.category);
                }
                if (recipe.tag != null) {
                    recipe.tag.forEach((tag) => tagSet.add(tag));
                }
               if(recipe.favorites > 0 && recipe.users.includes(currentUser.id)){
                    favoritesSet.push(recipe)
               }
               
               
               
                
            }
            
            if(areaTypes.length === 0){
              setAreaTypes(getRandomTypes([...areaSet].sort(), 2));  
            }
            if(categoryTypes.length === 0){setCategoryTypes(getRandomTypes([...categorySet].sort(), 2));}
            if(ingredientTypes.length === 0){setIngredientTypes(getRandomTypes([...ingredientSet].sort(), 3));}
            if(tagTypes.length === 0){setTagTypes(getRandomTypes([...tagSet].sort(), 2));}
            setFavoriteTypes(favoritesSet)
            // const newTypesObj = {
            //     area: getRandomTypes(areaTypes, 2),
            //     category: getRandomTypes(categoryTypes, 2),
            //     ingredient: getRandomTypes(ingredientTypes, 3),
            //     tag: getRandomTypes(tagTypes, 2),
            // };

            // setSliderTypes((sliderTypes) => [...sliderTypes, newTypesObj]);

            setIsLoading(false);
        } catch (error) {
            console.error(error.message);
        }
    };
console.log(favoriteTypes);

    const getRandomTypes = (typeArray, count) => {
        const randomIndices = numberSet(count, typeArray.length);
        const randomTypes = [];

        for (const index of randomIndices) {
            randomTypes.push(typeArray[index]);
        }

        return randomTypes;
    };

    const numberSet = (desired, max) => {
        // condition makes sure while loop isn't sticky
        if (max < desired) {
            desired = max;
        }

        const set = new Set();

        while (set.size < desired) {
            set.add(Math.floor(Math.random() * max));
        }

        return [...set];
    };

    const reshuffleButton =()=>{
       console.log("click");
        localStorage.clear()
        setAreaTypes([])
        setCategoryTypes([])
        setIngredientTypes([])
        setTagTypes([])
        
        // window.location.reload();
    }

    return (
        <>
            <div>
                {isLoading ? (
                    <p>Prep Recipes...</p>
                ) : (
                    <>
                        <button onClick={reshuffleButton}>Reshuffle</button>
                        
                        <h4>Favorites</h4>
                        {user !== null && <Favorites title="favorites"  recipeList={favoriteTypes}/>}

                        {/* <FamilyGroups title="family"  /> */}

                        {/* <MyRecipes title="myRecipes"  /> */}

                        <h4>Area</h4>
                        <RecipeSlide title="area" slideList={areaTypes} />

                        <h4>Ingredients</h4>
                        <RecipeSlide
                            title="ingredient"
                            slideList={ingredientTypes}
                        />

                        <h4>Category</h4>
                        <RecipeSlide
                            title="category"
                            slideList={categoryTypes}
                        />

                        <h4>Tags</h4>
                        <RecipeSlide title="tag" slideList={tagTypes} />
                    </>
                )}
            </div>
        </>
    );
};
export default HomePage;
