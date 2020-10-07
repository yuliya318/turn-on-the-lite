$(function () {

    // Game variables
    let levelNumber = 0;
    let brickStyle;
    let levelCompleted = false;
    let moves = 0;


    // Creating of level-buttons in menu block
    for (let i = 1; i <= 12; i++) {
        $('.menuLevels').html($('.menuLevels').html() + `<button type="button" class="btn btn-outline-dark level-btn my-btn">Level ${i}</button>`)
    }


    // "level"-buttons, "menu"-button, "next level"-button functions  start 
    $('.level-btn').each((ind, elem) => {
        $(elem).click(() => {
            $('.gameContainer').css({'backgroundColor': 'gray'});
            $('.levelBlock, .menuBlock').toggleClass('d-flex hidden');
            $('.lamp, #mainpath, #maincircle').addClass('hidden');
            levelNumber = ind;
            $(`#motionpath${levelNumber}, .menu-btn`).removeClass('hidden');
            $('.levelNumber').text(`Level: ${levelNumber + 1}`);
            $('.moves').text(`Moves: ${moves}`);
            levelStyle();
        })
    })

    $('.menu-btn').click(() => {
        $('.gameContainer').css({'backgroundColor': 'lightgray'});
        $('.levelBlock, .menuBlock').toggleClass('d-flex hidden');
        $('.lamp, #mainpath, #maincircle').removeClass('hidden');
        $('#maincircle').html(`<animateMotion dur="3s" calcmode="linear" repeatCount="indefinite">
            <mpath xlink:href="#mainpath" />`);
        $(`#motionpath${levelNumber}`).addClass('hidden');
        if (levelCompleted) {
            $('.levelHeading').toggleClass('activeHeading nonActiveHeading');
            $('.gameLevel').toggleClass('hidden d-flex');
            levelCompleted = false;
        };
        $('.next-btn').addClass('unvisible');
        moves = 0;
    })

    $('.next-btn').click(() => {
        $('.gameContainer').css({'backgroundColor': 'gray'});
        $('.levelHeading').toggleClass('activeHeading nonActiveHeading');
        $('.lamp, #maincircle').addClass('hidden');
        $(`#motionpath${levelNumber}`).addClass('hidden');
        $('.gameLevel').toggleClass('hidden d-flex');
        levelCompleted = false;
        levelNumber++;
        $(`#motionpath${levelNumber}`).removeClass('hidden');
        levelStyle();
        $('.next-btn').addClass('unvisible');
        moves = 0;
        $('.levelNumber').text(`Level: ${levelNumber + 1}`);
        $('.moves').text(`Moves: ${moves}`);
    })
    // "level"-buttons, "menu"-button, "next level"-button functions  end


    // Svg-paths of cable lines in the gamebricks of gamefield start
    let svgArr = ['<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="72px" height="72px" viewBox="0 0 72 72" E="xMidYMid meet">', '</svg>'];

    let lineArr = [
        '<line fill="none" class="horizLine" stroke="#000000" stroke-width="4" x1="72" y1="36" x2="0" y2= "36" />',
        '<line fill="none" class="vertLine" stroke="#000000" stroke-width="4" x1="36" y1="0" x2="36" y2= "72" />',
        '<path fill="none" class="1_leftUp" stroke="#000000" stroke-width="4" d="M36 72c0,-20 16,-36 36,-36"/>',
        '<path fill="none" class="2_rightUp" stroke="#000000" stroke-width="4" d="M36 72c0,-20 -16,-36 -36,-36"/>',
        '<path fill="none" class="3_leftDown" stroke="#000000" stroke-width="4" d="M36 0c0,20 16,36 36,36"/>',
        '<path fill="none" class="4_rightDown" stroke="#000000" stroke-width="4" d="M36 0c0,20 -16,36 -36,36"/>',
        '<polyline fill="none" class="arrow upArrow" stroke="#000000" stroke-width="4" stroke-linecap="round" points="49,13 36,0 23,13 "/>',
        '<polyline fill="none" class="arrow rightArrow" stroke="#000000" stroke-width="4" stroke-linecap="round" points="59,23 72,36 59,49 "/>',
        '<polyline fill="none" class="arrow downArrow" stroke="#000000" stroke-width="4" stroke-linecap="round" points="49,59 36,72 23,59 "/>',
        '<polyline fill="none" class="arrow leftArrow" stroke="#000000" stroke-width="4" stroke-linecap="round" points="13,23 0,36 13,49 "/>'
    ]
    // Svg-paths of cable lines in the gamebricks of gamefield end



    // Array with the gamebricks styles of every level 
    // Meaning of number before hyphen:
    //                                 10 - rotatable round brick  
    //                                 11 - rotatable round key brick, the part of cable path  
    //                                 21 - fixed brick 
    // Meaning of number after hyphen: every figure is index of svg arc/line/arrow in the array. '_' - means gamebrick contains only one arc/line
    let levelKeys = [
        ['21-0_', '11-07', '21-0_', '11-07', '21-0_'],
        ['11-07', '21-3_', '', '21-2_', '11-07', '', '11-47', '11-07', '11-56'],
        ['21-34', '10-59', '10-46', '10-07', '11-27', '11-47', '11-07', '21-34', '21-25', '11-56', '', '10-56', '11-47', '11-56'],
        ['11-38', '10-27', '11-27', '11-07', '11-07', '11-47', '21-34', '11-46', '21-01', '11-39', '10-39', '11-47', '11-38', '21-25', '11-56', '10-27', '21-0_', '11-47', '11-56', ''],
        ['11-07', '11-38', '11-27', '11-07', '11-38', '11-28', '21-25', '21-01', '21-34', '11-18', '11-18', '21-34', '21-25', '21-25', '11-47', '11-47', '11-07', '11-56', '10-56', '10-59'],
        ['21-01', '11-07', '11-38', '11-27', '21-34', '11-27', '11-07', '21-01', '11-56', '11-47', '11-16', '10-39', '21-01', '10-18', '10-56', '21-4_', '11-09', '11-59', '10-38', '21-5_'],
        ['11-07', '11-38', '11-27', '11-07', '11-07', '11-28', '21-25', '21-25', '11-07', '11-38', '11-18', '11-46', '21-01', '11-39', '11-18', '11-47', '11-07', '11-56', '11-46', '11-59'],
        ['11-38', '11-27', '11-38', '11-27', '11-07', '21-4_', '21-25', '21-34', '21-34', '11-39', '11-27', '21-25', '21-34', '21-01', '11-56', '11-46', '11-59', '11-46', '11-59', '21-5_'],
        ['11-07', '11-07', '11-38', '10-47', '11-27', '11-28', '11-09', '11-59', '21-25', '11-56', '11-18', '10-59', '21-25', '21-34', '11-39', '11-47', '11-07', '11-56', '11-47', '11-56'],
        ['11-38', '11-28', '11-39', '11-27', '11-07', '11-47', '21-34', '21-01', '21-25', '11-38', '11-28', '21-25', '21-01', '11-56', '11-18', '11-47', '11-56', '11-46', '11-09', '11-59'],
        ['11-07', '11-38', '11-27', '11-38', '11-27', '11-28', '11-59', '11-16', '11-18', '11-16', '11-18', '21-2_', '21-25', '21-25', '11-56', '11-47', '11-56', '11-47', '11-56', ''],
        ['11-38', '11-27', '11-07', '11-38', '11-27', '11-47', '21-01', '11-38', '11-47', '11-56', '11-28', '21-01', '21-01', '11-09', '11-39', '11-47', '11-56', '11-47', '11-07', '11-56']
    ];



    // Setting level styles function start 
    function levelStyle() {
        $('.gameLevel').html('');
        for (let i = 0; i < 20; i++) {
            $('.gameLevel').html($('.gameLevel').html() + `<div class="gameBrick"></div>`)
        }
        $('.gameBrick').each((ind, elem) => {
            brickStyle = `${levelKeys[levelNumber][ind]}`;
            if (brickStyle.slice(0, 1) == '1') {
                $(elem).addClass('rotatable');
                $(elem).css({
                    'backgroundImage': 'none',
                    'borderRadius': '50%',
                    'backgroundColor': 'rgb(167, 167, 167)'
                });
                if (brickStyle.slice(1, 2) == '1') {
                    $(elem).addClass('rotateKey');
                }
            }
            if (brickStyle.slice(4, 5) != '_') {
                $(elem).html(svgArr[0] + lineArr[brickStyle.slice(3, 4)] + lineArr[brickStyle.slice(4, 5)] + svgArr[1]);
            }
            else {
                $(elem).html(svgArr[0] + lineArr[brickStyle.slice(3, 4)] + svgArr[1]);
            }

        });

        // setting rotate-function to round gamebricks
        let randomDegIndex = () => Math.round(Math.random() * 3);
        let degrees = ['0deg', '90deg', '180deg', '270deg'];

        $('.rotatable').each((ind, elem) => {
            let index = randomDegIndex();
            $(elem).css({
                transform: `rotate(${degrees[index]})`
            })
        });
        $('.rotatable').click(function () {
            let elemDegress = getDegrees($(this));
            if (elemDegress == 270) {
                $(this).css({
                    transform: `rotate(0deg)`
                })
            } else {
                $(this).css({
                    transform: `rotate(${elemDegress + 90}deg)`
                })
            };
            moves++;
            $('.moves').text(`Moves: ${moves}`);
            checkResult();
        })
    }
    // Setting level styles function end


    // Getting transform:rotate value of event target element function 
    function getDegrees(element) {
        let a = element.attr('style').indexOf('rotate(');
        let b = element.attr('style').slice(a + 7);
        return parseInt(b);
    }


    // Checking gameprogress function 
    function checkResult() {
        for (let i = 0; i < $('.rotateKey').length; i++) {
            if (getDegrees($('.rotateKey').eq(i)) == 0) {
                if (i == ($('.rotateKey').length - 1)) {
                    $('.gameContainer').css({'backgroundColor': 'lightgray'});
                    $('.levelHeading').toggleClass('activeHeading nonActiveHeading');
                    $('.gameLevel').toggleClass('hidden d-flex');
                    $('#maincircle').html(`<animateMotion dur="3s" calcmode="linear" repeatCount="indefinite">
                    <mpath xlink:href="#motionpath${levelNumber}" />`);
                    $('.lamp, #maincircle').removeClass('hidden');
                    levelCompleted = true;
                    if (levelNumber < 11) {
                        $('.next-btn').removeClass('unvisible');
                    };
                    $('.level-btn').eq(levelNumber).addClass('level-passed-btn');
                };
            } else break;
        }
    }



})


