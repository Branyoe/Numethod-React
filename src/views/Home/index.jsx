import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import MyCard from './components/card';
import useAppBarStore from '../../stores/AppBarStore';


export default function Home() {
  const imageSources = [];
  imageSources.push(
    "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/False_position_method.svg/527px-False_position_method.svg.png",

  );

  const { setCurrentRoute } = useAppBarStore(state => ({
    setCurrentRoute: state.setCurrentRoute
  }))

  React.useEffect(() => {
    setCurrentRoute("")
  }, [])

  return (
    <Box sx={{ width: '100%' }}>
      <Grid
        container
        columns={12}
        rowGap={2}
        columnSpacing={{ xs: 0, sm: 2, md: 2 }}
      >
        <Grid item sx={{ justifyContent: 'center', display: 'flex' }} xs={12} sm={4} md={3}>
          <MyCard
            imgSrc={"https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/False_position_method.svg/527px-False_position_method.svg.png"}
            title={"Regla falsa"}
            description="Proviene de la Regula Falsi que es un método iterativo de resolución numérica de ecuaciónes no lineales"
            body="Este método combina el método de bisección y el método de la secante. También se la conoce como método de interpolación lineal"
            route="/regla-falsa"
          />
        </Grid>
        <Grid item sx={{ justifyContent: 'center', display: 'flex' }} xs={12} sm={4} md={3}>
          <MyCard
            imgSrc={"https://mastersagan.files.wordpress.com/2021/11/1-metodo-biseccion-1.jpg"}
            title={"Bisección"}
            description="el método de bisección, también llamado dicotomía, es un algoritmo de búsqueda de raíces"
            body="que trabaja dividiendo el intervalo a la mitad y seleccionando el subintervalo que tiene la raíz"
            route="/biseccion"
          />
        </Grid>
        <Grid item sx={{ justifyContent: 'center', display: 'flex' }} xs={12} sm={4} md={3}>
          <MyCard
            imgSrc={"https://www.classicistranieri.com/wikipediaforschoolses/images/129/12965.png"}
            title={"Integrales"}
            description="La integral definida es un caso de la integral utilizado para determinar el valor de las áreas delimitadas por una gráfica dentro de un intervalo y el eje horizontal."
            body="Dada una función f(x) de una variable real x y un intervalo [a,b] de la recta real, la integral definida es igual al área limitada entre la gráfica de f(x), el eje de abscisas, y las líneas verticales x = a y x = b."
            route="/biseccion"
          />
        </Grid>
      </Grid>
    </Box>
  );
}
