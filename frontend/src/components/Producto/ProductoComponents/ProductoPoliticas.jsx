import styledComponents from "styled-components"

const ProductoPoliticas = ({ politicas }) => {
    console.log(politicas)
    console.log([...new Set(politicas?.map(politica => politica.tipo.name))])
    return (
        <Container>
            <Titulo>
                <h3>¿Qué tenés que saber?</h3>
            </Titulo>
            <PoliticaContainer>
                {
                    [...new Set(politicas?.map(politica => politica.tipo.name))].map((politica, index) => {
                        console.log(politicas?.filter(p => p.tipo.name === politica))
                        return (
                            <Politica key={index}>
                                <h4>{politica}</h4>
                                {politicas?.filter(p => p.tipo.name === politica).map((politica, index) => {
                                    return (
                                        <p key={index}>{politica.name}</p>
                                    )
                                })}
                            </Politica>
                        )
                    })
                }
            </PoliticaContainer>
        </Container>
    )
}

export default ProductoPoliticas

const Container = styledComponents.div`
padding-top: 1rem;
width: 100%;
text-align: left;
background-color: var(--colorQuinto);
`

const Titulo = styledComponents.div`
padding-bottom: 1rem;
padding-top: 1rem;
font-size: 1.5rem;
color: var(--colorPrincipal);
border-bottom: 2px solid var(--colorSecundario);
h3 {
    padding-left: 2rem;
}
`

const PoliticaContainer = styledComponents.div`
display: grid;
grid-template-columns: repeat(4, 1fr);
grid-template-rows: 1fr;
grid-column-gap: 0px;
grid-row-gap: 0px;
padding: 2rem;

@media only screen and (max-width: 768px){
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: 2fr;
    grid-row-gap: 2rem;
}

@media only screen and (max-width: 425px){
    grid-template-columns: repeat(1, 1fr);
    grid-template-rows: 4fr;
}
`

const Politica = styledComponents.div`
h4 {
    font-size: 1.25rem;
    color: var(--colorPrincipal);
    padding-bottom: 2rem;
}
p {
    color: var(--colorSexto);
    font-weight: 500;
    padding-bottom: 1.5rem;
}
`