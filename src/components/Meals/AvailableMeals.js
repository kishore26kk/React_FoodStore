import { useEffect, useState } from 'react';
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";


const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState('');
  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch('https://react-https-62f16-default-rtdb.firebaseio.com/Meals.json');
      const responseData = await response.json();
      // console.log(responseData);
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }
      const loadedData = [];
      for (const key in responseData) {
        loadedData.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price
        })
      }
      setMeals(loadedData);
      setIsLoading(false);
    }
    fetchMeals().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    })
  }, [])
  const mealsList = meals.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));
  if (isLoading && !httpError) {
    return (
      <section className={classes.MealsLoading}>
        <p>Loading..</p>
      </section>
    );
  }
  if (httpError) {
    return (
      <section className={classes.MealsError}>
        <p>{httpError}</p>
      </section>
    )
  }
  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
