
$(function () {
    'use strick';

    // Variables
    var dice1;
    var dice2;
    var dice3;
    var dice4;
    var dice5;
    var randomValues = [];
    var randomDices = []; // Use for store random dices vals
    var rollCount = 0;
    var chooseScore = 13; // To determind Number of choose scored cell to end game
    var startGame = false; 

    /**--------------------------------------------------------------
     * --------------------- Start Game { Roll } --------------------
     * ---------------------------------------------------------------
     */
    // Onclick roll button
    $('#roll').on('click', function () {
        startGame = true;
        // Check the user alerady choose all possable scores 
        if (chooseScore == 0) {
            $(this).attr('disabled', 'disabled').css({
                'opacity': .5,
                'cursor': 'default'
            });
        }
        rollCount++;
        if (rollCount == 3) {
            $(this).attr('disabled', 'disabled').css({
                'opacity': .5,
                'cursor': 'default'
            });
        }  
        // Generate randome dices
        dice1 = Math.floor(Math.random() * 6) + 1;
        dice2 = Math.floor(Math.random() * 6) + 1;
        dice3 = Math.floor(Math.random() * 6) + 1;
        dice4 = Math.floor(Math.random() * 6) + 1;
        dice5 = Math.floor(Math.random() * 6) + 1;

        // Make an array for store random dices
        randomDices = [dice1, dice2, dice3, dice4, dice5];

        $('.dices ul li').each(function () {
            var i = $(this).index();
            var play = $(this).attr('data-play'); // For determind the dice click or not
            if( play === 'off') {
                // Change dices
                $(this).children().attr('src', 'images/purple'+ randomDices[i] +'.png');
                // Set the random as a data-index for can i use it in image name whenclick on the dice
                $(this).children().attr('data-index', randomDices[i]);
                $(this).attr('data-value', randomDices[i]);
            }
        });

        showScores();
       
    });
    /**--------------------------------------------------------------
    * --------------------- Choose Dices ----------------------------
    * ---------------------------------------------------------------
    */
    // Onclick dice-img / choose dice
    $('.dices ul li').on('click', function () {
        if (startGame === true) {
            // Get the data-index of image name
            var inx =  $(this).children().attr('data-index');
            // For you can dice or cancel choose
            $(this).toggleClass('choosen');
            if ($(this).hasClass('choosen')) {
                $(this).children().attr('src', 'images/blue'+inx+'.png');
                $(this).attr('data-play', 'on');
            } else {
                $(this).children().attr('src', 'images/purple'+inx+'.png');
                $(this).attr('data-play', 'off');
            }
        } else {
            alert("Click Roll To Start Game");
        }

    });
          
    /**--------------------------------------------------------------
    * --------------------- Hover On Cell To Show Score ------------
    * ---------------------------------------------------------------
    */
    $('#scoretable tr td:last-of-type').on('mouseover',function(){
        $(this).children().css('visibility', 'visible');
    });
    $('#scoretable tr td:last-of-type').on('mouseout',function(){
        if ($(this).hasClass('active')) {
            $(this).children().css('visibility', 'visible');
        } else {
            $(this).children().css('visibility', 'hidden');
        }
    });
    /**--------------------------------------------------------------
    * --------------------- Click On Cell Regiset Score ----------------
    * ---------------------------------------------------------------
    */
   var totalScore = 0; // For calculate the cells scores
    $('#scoretable tr td:last-of-type').on('click', function () {
        if (startGame === true) {
            chooseScore -= 1; // To finsh game after 13 click occurence
            startGame = false;
            if ($(this).children().text() === '') {
                $(this).text('0');
                totalScore += parseInt($(this).children().text());
                $('#total-score').text(totalScore);
                rollCount = 0;
                $(this).addClass('active');
            }
            // Check for clicked or not for add score to total
            if ((!$(this).hasClass('active')) && ($(this).children().text() != '')) {
                totalScore += parseInt($(this).children().text());
                $('#total-score').text(totalScore);
                rollCount = 0;
                $(this).addClass('active');
            }
            // Reset Roll button to can roll againe
            $('#roll').removeAttr('disabled').css({
                'opacity': 1,
                'cursor': 'pointer'
            });
            // Rest table td cell score
            $('#scoretable tr td:last-of-type').each(function () {
                if (!$(this).hasClass('active')) {
                    $(this).children().text('');
                }
            });

            $('.dices ul li').each(function (index) {
                $(this).children().attr('src', '');
                $(this).attr('data-play', 'off');
                $(this).attr('data-index','');
                $(this).attr('data-value','');
            });
        }
    });

    /**--------------------------------------------------------------
    * --------------------- Click To Start New Game ----------------
    * ---------------------------------------------------------------
    */
    // Onclick new game button to reset all game options
    $('#new-game').on('click', function () {
        chooseScore = 13;
        rollCount = 0;
        startGame = false;
        randomDices = []; // Reset randome dices 
        randomValues = []; // Reset randome dices values
        $('.dices ul li img').each(function (index) {
            // reset Dices
            $(this).attr('src', '');
            // +1 for 0 index
            $(this).attr('data-index', '');
            // Reset playing value
            $(this).parent().attr('data-play', 'off');
            // Reset data value
            $(this).parent().attr('data-value', '');
        });
        $('#scoretable tr td:last-of-type').each(function () {
            $(this).children().text('');
            $(this).removeClass('active');
        });
        // Reset total score
        $('#total-score').text(''); 
    });

    /* ====================================================
        ========= Show scores ===========
    */
    function showScores() { 
        // Get data-value of dices and store values in randomeValue array
        randomValues = []; // Empty array for restore values againe
        $('.dices ul li').each(function () {
            randomValues.push($(this).attr('data-value'));
        });
        /* ------------------------------------------------------------------- */
        var counts = {}; // Define object
        counts = {1:0,2:0,3:0,4:0,5:0,6:0}; // Define object with iniatial values
        // Calculate number of occurance dice
        $.each(randomValues, function (key, value) {
            if(!counts.hasOwnProperty(value)) {
                counts[value] = 1;
            } else {
                counts[value]++;
            }
        });
        var uniqueID;
        $('#scoretable tr td:last-of-type').each(function () {
            // Get the data-id 
            uniqueID = $(this).attr('data-id');
            // Checking Dices Scored
            switch(uniqueID) {
                case 'ones': 
                    if(!$(this).hasClass('active')) {
                        $(this).children().text(1 * counts['1']);
                    }      
                    break;
                case 'twos': 
                    if(!$(this).hasClass('active')) {       
                        $(this).children().text(2 * counts['2']); 
                    }
                break;
                case 'threes':
                    if(!$(this).hasClass('active')) {      
                        $(this).children().text(3 * counts['3']);
                    }
                break;
                case 'fours':
                    if(!$(this).hasClass('active')) {       
                        $(this).children().text(4 * counts['4']);
                    } 
                break;
                case 'fives':
                    if(!$(this).hasClass('active')) {       
                        $(this).children().text(5 * counts['5']);
                    } 
                break;
                case 'sixes':
                    if(!$(this).hasClass('active')) {       
                        $(this).children().text(6 * counts['6']);
                    } 
                break;
                case 'three-of-a-kind':
                    if(!$(this).hasClass('active')) {
                        var sumThrees=0;
                        // Calculate the summation of all dices
                        $('.dices ul li').each(function () {
                            sumThrees += parseInt($(this).attr('data-value'));
                        });
                        for (var key in counts) {
                            if (counts[key] >= 3) {
                                $(this).children().text(sumThrees);
                                break;
                            } else {
                                $(this).children().text('0');
                            }
                        }
                    }
                break;
                case 'four-of-a-kind':
                    if(!$(this).hasClass('active')) {
                        var sumFour=0;
                        // Calculate the summation of all dices
                        $('.dices ul li').each(function () {
                            sumFour += parseInt($(this).attr('data-value'));
                        });
                        for (var key in counts) {
                            if (counts[key] >= 4) {   
                                $(this).children().text(sumFour);
                                break;
                            } else {
                                $(this).children().text('0');
                            }
                        }
                    }
                break;
                case 'full-house':
                    console.log(counts);
                    if(!$(this).hasClass('active')) {
                        var values = [];
                        for (var key in counts) {
                            if (counts[key] === 2 || counts[key] === 3) {
                                values.push(counts[key]);
                            }  
                        }
                        if (values.length == 2) {
                            $(this).children().text('25');
                        } else {
                            $(this).children().text('0');
                        }
                    }
                break;
                case 'small-straight':
                    if(!$(this).hasClass('active')) {
                        if (counts['4'] === 1) {
                            $(this).children().text('30');
                        } else {
                            $(this).children().text('0');
                        }
                    }
                break;
                case 'large-straight':
                    if(!$(this).hasClass('active')) {
                        if (counts['5'] === 1) {
                            $(this).children().text('40');
                        } else {
                            $(this).children().text('0');
                        }
                    }
                break;
                case 'yahtzee':
                    if(!$(this).hasClass('active')) {
                        var sameValues = [];
                        var val = 0;
                        if ($('.dices ul li').attr('data-value') !== '') {
                            for (var key in counts) {
                                sameValues.push(counts[key]);
                            }
                            val = sameValues.every(function (value) { 
                                return value === sameValues[0];
                            });
                            if (val === true) {
                                $(this).children().text('50');
                            } else {
                                $(this).children().text('0');
                            }
                        }
                    }
                break;
                case 'chance':
                    if(!$(this).hasClass('active')) {
                        var sum= 0;
                        // Check for user alerady start game and playing
                        if ($('.dices ul li').attr('data-value') !== '') {
                            $('.dices ul li').each(function () {
                                sum += parseInt($(this).attr('data-value'));
                            });
                        }
                        $(this).children().text(sum);
                    }
                break;
            }//End switch
        })
   }// End showScroes Function
});