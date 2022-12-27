// Task to implement it

// 1.Change the speed in the data
// 2.At start add the following fields to theme state
//    a.Unit to be used for calculation of total size in "unit" property
//    b.Add the size of all the files in the same unit to be used in "size" array.
// //////////////////////////////
// Now keep updating the "perc" in theme state to see the magic  

import React, { useState, useEffect } from 'react';
import styled, { css, ThemeProvider } from 'styled-components';
const Progress = styled.div`
    width: 20rem;
    height: 20rem;
    border-radius: 100%;
    position:relative;
    font-size:1.5rem;
    background:grey;
`
const ProgressContent = styled.div
    `
position:absolute;
top:50%;
left:50%;
translate:-50% -50%;
width:calc(100% - 1.5rem);
height:calc(100% - 1.5rem);
background:white;
border-radius:100%;
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
z-index:5;
gap:1rem;
`
const ProgressContentItem = styled.p`
    font-size:1.6rem;
`;
const ProgressLoadItem = styled.div`
width:100%;
height:100%;
border-radius:100%;
position:absolute;
top:50%;
left:50%;
z-index:2;
translate:-50% -50%;
border: solid transparent;
border-width:1.5rem;
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
border:solid grey;
border-width:1.5rem;
border-radius:0 100% 0 0;
${props => {
        if (props.theme.perc > 25) return css`
    display:none;
    `
    }}
`
function Loader() {

    const [theme, setTheme] = useState({
        perc: 0, size: [675.01, 567.2], unit: 'KB', totalSizeCalc: function () {
            this.totalSize = Number.parseFloat(this.size?.reduce((acc, el) => acc + el, 0).toFixed(2));
        },
        nextSizeTillCalc: function () {
            let temp = Array(this.size.length).fill(0);
            let value = 0;
            this.size.forEach((el, index) => {
                value += el;
                temp[index] = value;
            })
            this.nextSizeTill = [...temp];
        },
        noFilesDone: 0,
    });
    const noFilesCalc = function () {
        const value = theme.totalSize * .01 * theme.perc;
        if (theme.nextSizeTill) {
            if (value >= theme.nextSizeTill[theme.noFilesDone]) {
                setTheme(prevState => {
                    return { ...prevState, noFilesDone: (prevState.noFilesDone + 1) };
                })
            }
        }
        return theme.noFilesDone;

    }

    useEffect(() => {
        theme.totalSizeCalc();
        theme.nextSizeTillCalc();
        setTimeout(() => {
            setTheme((prevState) => {
                return { ...prevState, perc: 60 };
            })
        }, 100)
    }, [])

    return (<>
        <ThemeProvider theme={theme} >
            <Progress >
                <ProgressContent >
                    <ProgressContentItem>{theme.totalSize ? (theme.totalSize * .01 * theme.perc).toFixed(2) : 0} / {theme?.totalSize} {theme.unit} </ProgressContentItem>
                    <ProgressContentItem>{noFilesCalc()} / {theme.size.length} files transferred</ProgressContentItem>
                    <ProgressContentItem>Speed: 0 KB/s</ProgressContentItem>{/* Here change the speed */}
                </ProgressContent>
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