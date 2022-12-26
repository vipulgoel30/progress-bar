import React, { useState, useEffect } from 'react';
import styled, { css, ThemeProvider } from 'styled-components';
const Progress = styled.div`
    width: 25rem;
    height: 25rem;
    border-radius: 100%;
    position:relative;
`
const ProgressContent = styled.p
    `
position:absolute;
top:50%;
left:50%;
translate:-50% -50%;
width:75%;
height:75%;
background:white;
border-radius:100%;
display:flex;
justify-content:center;
align-items:center;
font-size:2rem;
z-index:5;
`
const ProgressLoadItem = styled.div`
width:100%;
height:100%;
border-radius:100%;
position:absolute;
top:50%;
left:50%;
z-index:2;
translate:-50% -50%;
border:30px solid transparent;
border-left-color:${props => {
        if (props.theme.perc < 25) {
            return '#75d77b'
        } else if (props.theme.perc < 50) {
            return '#24c200'
        }
        else if (props.theme.perc < 75) {
            return '#20ad00'
        } else {
            return '#009419'
        }
    }}};

transition:all .1s;
transition:border-left-color .2s;
`
const ProgressLoadItemOne = styled(ProgressLoadItem)`
rotate:45deg;
${props => {
        if (props.theme.perc <= 25) return css`
        rotate: ${135 - 3.6 * props.theme.perc}deg!important;
            `
    }}
`
const ProgressLoadItemTwo = styled(ProgressLoadItem)`
rotate:-45deg;
${props => {
        if (props.theme.perc > 25 && props.theme.perc <= 50) return css`
                    rotate: ${135 - 3.6 * props.theme.perc
            }deg;
`
        if (props.theme.perc <= 25) { return css`display:none;` }
    }}
`
const ProgressLoadItemThree = styled(ProgressLoadItem)`
rotate:-135deg;

${props => {
        if (props.theme.perc > 50 && props.theme.perc <= 75) return css`

                    rotate: ${135 - 3.6 * props.theme.perc
            }deg;
    
`
        if (props.theme.perc <= 50) { return css`display:none;` }
    }}

`
const ProgressLoadItemFour = styled(ProgressLoadItem)`
rotate:-270deg;
display:none;
${props => {
        if (props.theme.perc >= 75) return css`
        display:block;
                    rotate: ${135 - 3.6 * props.theme.perc
            }deg;
`

    }}

`
const ProgressCover = styled.div`
width:50%;
height:50%;
position:absolute;
background:white;
z-index:4;
top:0;
left:50%;
border-radius:0 100% 0 0;
${props => {
        if (props.theme.perc > 25) return css`
    display:none;
    `
    }}
`
function Loader() {
    const [theme, setTheme] = useState({ perc: 0 });
    useEffect(() => {
        const interval = setInterval(() => {
            setTheme((prevState) => {
                const percValue = ++(prevState.perc);
                return { perc: percValue };
            });

        }, 50);
        setTimeout(() => {

            clearInterval(interval);
        }, 5000);
    }, [])
    return (<>
        <ThemeProvider theme={theme}>
            <Progress >
                <ProgressContent>{theme.perc + '%'}</ProgressContent>
                <ProgressLoadItemOne />
                <ProgressLoadItemTwo />
                <ProgressLoadItemThree />
                <ProgressLoadItemFour />
                <ProgressCover />
            </Progress>
        </ThemeProvider>

    </>)
}
export default Loader;