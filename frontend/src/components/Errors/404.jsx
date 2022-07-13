import styled from "styled-components"


export default function Error() {
    document.title = "Hubo un error en la página";
    return <Parent style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '81vh'
    }}>
        {/* <iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ?controls=0&autoplay=1" title="YouTube video player" allow="autoplay"></iframe>
        <div style={{"position":"absolute", "top":"0", "left":"0", "right":"0","bottom":"0"}}></div> */}
        <h2>Hubo un error</h2>
        <p>Por favor, intenta de nuevo más tarde.</p>
    </Parent>
}

const Parent = styled.div`
    min-height: 100%;
    overflow: hidden;cd "\Program Files (x86)\Google\Chrome\Application"

Timeout 3


    position: relative;
    iframe {
        position:absolute;
        width:100%;
        height:100%;
        top:0; bottom:0;
        left:0; right:0;
    }
`;

