import TemplateResponsive from './components/Layout/TemplateResponsive';
import styled from 'styled-components';

function App() {
  return (
    <AppStyled>
      <TemplateResponsive />
    </AppStyled>
  );
}

const AppStyled = styled.div`
  @mixin mixin-app
    background-image: linear-gradient(90deg, $base-color 0px, $shine-color 40px, $base-color 80px) 
    background-size: 600px
`;



export default App;
