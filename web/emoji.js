(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function() {

    const namespace = require('../package.json')['open-chat-framework']['namespace'];
    window.OpenChatFramework.plugin[namespace] = require('../plugin.js');

})();

},{"../package.json":3,"../plugin.js":4}],2:[function(require,module,exports){
// adapted from
// https://github.com/HenrikJoreteg/emoji-images/blob/master/emoji-images.js

// list of emojii text to parse
module.exports = [':blush:', ':scream:', ':smirk:', ':smiley:',
':stuck_out_tongue_closed_eyes:', ':stuck_out_tongue_winking_eye:',
':rage:', ':disappointed:', ':sob:', ':kissing_heart:', ':wink:',
':pensive:', ':confounded:', ':flushed:', ':relaxed:', ':mask:',
':heart:', ':broken_heart:', ':sunny:', ':umbrella:', ':cloud:',
':snowflake:', ':snowman:', ':zap:', ':cyclone:', ':foggy:', ':ocean:',
':cat:', ':dog:', ':mouse:', ':hamster:', ':rabbit:', ':wolf:', ':frog:',
':tiger:', ':koala:', ':bear:', ':pig:', ':pig_nose:', ':cow:', ':boar:',
':monkey_face:', ':monkey:', ':horse:', ':racehorse:', ':camel:',
':sheep:', ':elephant:', ':panda_face:', ':snake:', ':bird:',
':baby_chick:', ':hatched_chick:', ':hatching_chick:', ':chicken:',
':penguin:', ':turtle:', ':bug:', ':honeybee:', ':ant:', ':beetle:',
':snail:', ':octopus:', ':tropical_fish:', ':fish:', ':whale:',
':whale2:', ':dolphin:', ':cow2:', ':ram:', ':rat:', ':water_buffalo:',
':tiger2:', ':rabbit2:', ':dragon:', ':goat:', ':rooster:', ':dog2:',
':pig2:', ':mouse2:', ':ox:', ':dragon_face:', ':blowfish:',
':crocodile:', ':dromedary_camel:', ':leopard:', ':cat2:', ':poodle:',
':paw_prints:', ':bouquet:', ':cherry_blossom:', ':tulip:',
':four_leaf_clover:', ':rose:', ':sunflower:', ':hibiscus:',
':maple_leaf:', ':leaves:', ':fallen_leaf:', ':herb:', ':mushroom:',
':cactus:', ':palm_tree:', ':evergreen_tree:', ':deciduous_tree:',
':chestnut:', ':seedling:', ':blossom:', ':ear_of_rice:', ':shell:',
':globe_with_meridians:', ':sun_with_face:', ':full_moon_with_face:',
':new_moon_with_face:', ':new_moon:', ':waxing_crescent_moon:',
':first_quarter_moon:', ':waxing_gibbous_moon:', ':full_moon:',
':waning_gibbous_moon:', ':last_quarter_moon:', ':waning_crescent_moon:',
':last_quarter_moon_with_face:', ':first_quarter_moon_with_face:',
':moon:', ':earth_africa:', ':earth_americas:', ':earth_asia:',
':volcano:', ':milky_way:', ':partly_sunny:', ':octocat:', ':squirrel:',
':bamboo:', ':gift_heart:', ':dolls:', ':school_satchel:',
':mortar_board:', ':flags:', ':fireworks:', ':sparkler:', ':wind_chime:',
':rice_scene:', ':jack_o_lantern:', ':ghost:', ':santa:',
':christmas_tree:', ':gift:', ':bell:', ':no_bell:', ':tanabata_tree:',
':tada:', ':confetti_ball:', ':balloon:', ':crystal_ball:', ':cd:',
':dvd:', ':floppy_disk:', ':camera:', ':video_camera:', ':movie_camera:',
':computer:', ':tv:', ':iphone:', ':phone:', ':telephone:',
':telephone_receiver:', ':pager:', ':fax:', ':minidisc:', ':vhs:',
':sound:', ':speaker:', ':mute:', ':loudspeaker:', ':mega:',
':hourglass:', ':hourglass_flowing_sand:', ':alarm_clock:', ':watch:',
':radio:', ':satellite:', ':loop:', ':mag:', ':mag_right:', ':unlock:',
':lock:', ':lock_with_ink_pen:', ':closed_lock_with_key:', ':key:',
':bulb:', ':flashlight:', ':high_brightness:', ':low_brightness:',
':electric_plug:', ':battery:', ':calling:', ':email:', ':mailbox:',
':postbox:', ':bath:', ':bathtub:', ':shower:', ':toilet:', ':wrench:',
':nut_and_bolt:', ':hammer:', ':seat:', ':moneybag:', ':yen:', ':dollar:',
':pound:', ':euro:', ':credit_card:', ':money_with_wings:', ':e-mail:',
':inbox_tray:', ':outbox_tray:', ':envelope:', ':incoming_envelope:',
':postal_horn:', ':mailbox_closed:', ':mailbox_with_mail:',
':mailbox_with_no_mail:', ':door:', ':smoking:', ':bomb:', ':gun:',
':hocho:', ':pill:', ':syringe:', ':page_facing_up:', ':page_with_curl:',
':bookmark_tabs:', ':bar_chart:', ':chart_with_upwards_trend:',
':chart_with_downwards_trend:', ':scroll:', ':clipboard:', ':calendar:',
':date:', ':card_index:', ':file_folder:', ':open_file_folder:',
':scissors:', ':pushpin:', ':paperclip:', ':black_nib:', ':pencil2:',
':straight_ruler:', ':triangular_ruler:', ':closed_book:', ':green_book:',
':blue_book:', ':orange_book:', ':notebook:',
':notebook_with_decorative_cover:', ':ledger:', ':books:', ':bookmark:',
':name_badge:', ':microscope:', ':telescope:', ':newspaper:',
':football:', ':basketball:', ':soccer:', ':baseball:', ':tennis:',
':8ball:', ':rugby_football:', ':bowling:', ':golf:',
':mountain_bicyclist:', ':bicyclist:', ':horse_racing:', ':snowboarder:',
':swimmer:', ':surfer:', ':ski:', ':spades:', ':hearts:', ':clubs:',
':diamonds:', ':gem:', ':ring:', ':trophy:', ':musical_score:',
':musical_keyboard:', ':violin:', ':space_invader:', ':video_game:',
':black_joker:', ':flower_playing_cards:', ':game_die:', ':dart:',
':mahjong:', ':clapper:', ':memo:', ':pencil:', ':book:', ':art:',
':microphone:', ':headphones:', ':trumpet:', ':saxophone:', ':guitar:',
':shoe:', ':sandal:', ':high_heel:', ':lipstick:', ':boot:', ':shirt:',
':tshirt:', ':necktie:', ':womans_clothes:', ':dress:',
':running_shirt_with_sash:', ':jeans:', ':kimono:', ':bikini:',
':ribbon:', ':tophat:', ':crown:', ':womans_hat:', ':mans_shoe:',
':closed_umbrella:', ':briefcase:', ':handbag:', ':pouch:', ':purse:',
':eyeglasses:', ':fishing_pole_and_fish:', ':coffee:', ':tea:', ':sake:',
':baby_bottle:', ':beer:', ':beers:', ':cocktail:', ':tropical_drink:',
':wine_glass:', ':fork_and_knife:', ':pizza:', ':hamburger:', ':fries:',
':poultry_leg:', ':meat_on_bone:', ':spaghetti:', ':curry:',
':fried_shrimp:', ':bento:', ':sushi:', ':fish_cake:', ':rice_ball:',
':rice_cracker:', ':rice:', ':ramen:', ':stew:', ':oden:', ':dango:',
':egg:', ':bread:', ':doughnut:', ':custard:', ':icecream:',
':ice_cream:', ':shaved_ice:', ':birthday:', ':cake:', ':cookie:',
':chocolate_bar:', ':candy:', ':lollipop:', ':honey_pot:', ':apple:',
':green_apple:', ':tangerine:', ':lemon:', ':cherries:', ':grapes:',
':watermelon:', ':strawberry:', ':peach:', ':melon:', ':banana:',
':pear:', ':pineapple:', ':sweet_potato:', ':eggplant:', ':tomato:',
':corn:', ':alien:', ':angel:', ':anger:', ':angry:', ':anguished:',
':astonished:', ':baby:', ':blue_heart:', ':blush:', ':boom:', ':bow:',
':bowtie:', ':boy:', ':bride_with_veil:', ':broken_heart:',
':bust_in_silhouette:', ':busts_in_silhouette:', ':clap:', ':cold_sweat:',
':collision:', ':confounded:', ':confused:', ':construction_worker:',
':cop:', ':couple_with_heart:', ':couple:', ':couplekiss:', ':cry:',
':crying_cat_face:', ':cupid:', ':dancer:', ':dancers:', ':dash:',
':disappointed:', ':dizzy_face:', ':dizzy:', ':droplet:', ':ear:',
':exclamation:', ':expressionless:', ':eyes:', ':facepunch:', ':family:',
':fearful:', ':feelsgood:', ':feet:', ':finnadie:', ':fire:', ':fist:',
':flushed:', ':frowning:', ':girl:', ':goberserk:', ':godmode:',
':green_heart:', ':grey_exclamation:', ':grey_question:', ':grimacing:',
':grin:', ':grinning:', ':guardsman:', ':haircut:', ':hand:', ':hankey:',
':hear_no_evil:', ':heart_eyes_cat:', ':heart_eyes:', ':heart:',
':heartbeat:', ':heartpulse:', ':hurtrealbad:', ':hushed:', ':imp:',
':information_desk_person:', ':innocent:', ':japanese_goblin:',
':japanese_ogre:', ':joy_cat:', ':joy:', ':kiss:', ':kissing_cat:',
':kissing_closed_eyes:', ':kissing_heart:', ':kissing_smiling_eyes:',
':kissing:', ':laughing:', ':lips:', ':love_letter:',
':man_with_gua_pi_mao:', ':man_with_turban:', ':man:', ':mask:',
':massage:', ':metal:', ':muscle:', ':musical_note:', ':nail_care:',
':neckbeard:', ':neutral_face:', ':no_good:', ':no_mouth:', ':nose:',
':notes:', ':ok_hand:', ':ok_woman:', ':older_man:', ':older_woman:',
':open_hands:', ':open_mouth:', ':pensive:', ':persevere:',
':person_frowning:', ':person_with_blond_hair:',
':person_with_pouting_face:', ':point_down:', ':point_left:',
':point_right:', ':point_up_2:', ':point_up:', ':poop:', ':pouting_cat:',
':pray:', ':princess:', ':punch:', ':purple_heart:', ':question:',
':rage:', ':rage1:', ':rage2:', ':rage3:', ':rage4:', ':raised_hand:',
':raised_hands:', ':relaxed:', ':relieved:', ':revolving_hearts:',
':runner:', ':running:', ':satisfied:', ':scream_cat:', ':scream:',
':see_no_evil:', ':shit:', ':skull:', ':sleeping:', ':sleepy:',
':smile_cat:', ':smile:', ':smiley_cat:', ':smiley:', ':smiling_imp:',
':smirk_cat:', ':smirk:', ':sob:', ':sparkling_heart:', ':sparkles:',
':speak_no_evil:', ':speech_balloon:', ':star:', ':star2:',
':stuck_out_tongue_closed_eyes:', ':stuck_out_tongue_winking_eye:',
':stuck_out_tongue:', ':sunglasses:', ':suspect:', ':sweat_drops:',
':sweat_smile:', ':sweat:', ':thought_balloon:', ':-1:', ':thumbsdown:',
':thumbsup:', ':+1:', ':tired_face:', ':tongue:', ':triumph:',
':trollface:', ':two_hearts:', ':two_men_holding_hands:',
':two_women_holding_hands:', ':unamused:', ':v:', ':walking:', ':wave:',
':weary:', ':wink2:', ':wink:', ':woman:', ':worried:', ':yellow_heart:',
':yum:', ':zzz:', ':109:', ':house:', ':house_with_garden:', ':school:',
':office:', ':post_office:', ':hospital:', ':bank:',
':convenience_store:', ':love_hotel:', ':hotel:', ':wedding:', ':church:',
':department_store:', ':european_post_office:', ':city_sunrise:',
':city_sunset:', ':japanese_castle:', ':european_castle:', ':tent:',
':factory:', ':tokyo_tower:', ':japan:', ':mount_fuji:',
':sunrise_over_mountains:', ':sunrise:', ':stars:', ':statue_of_liberty:',
':bridge_at_night:', ':carousel_horse:', ':rainbow:', ':ferris_wheel:',
':fountain:', ':roller_coaster:', ':ship:', ':speedboat:', ':boat:',
':sailboat:', ':rowboat:', ':anchor:', ':rocket:', ':airplane:',
':helicopter:', ':steam_locomotive:', ':tram:', ':mountain_railway:',
':bike:', ':aerial_tramway:', ':suspension_railway:',
':mountain_cableway:', ':tractor:', ':blue_car:', ':oncoming_automobile:',
':car:', ':red_car:', ':taxi:', ':oncoming_taxi:', ':articulated_lorry:',
':bus:', ':oncoming_bus:', ':rotating_light:', ':police_car:',
':oncoming_police_car:', ':fire_engine:', ':ambulance:', ':minibus:',
':truck:', ':train:', ':station:', ':train2:', ':bullettrain_front:',
':bullettrain_side:', ':light_rail:', ':monorail:', ':railway_car:',
':trolleybus:', ':ticket:', ':fuelpump:', ':vertical_traffic_light:',
':traffic_light:', ':warning:', ':construction:', ':beginner:', ':atm:',
':slot_machine:', ':busstop:', ':barber:', ':hotsprings:',
':checkered_flag:', ':crossed_flags:', ':izakaya_lantern:', ':moyai:',
':circus_tent:', ':performing_arts:', ':round_pushpin:',
':triangular_flag_on_post:', ':jp:', ':kr:', ':cn:', ':us:', ':fr:',
':es:', ':it:', ':ru:', ':gb:', ':uk:', ':de:', ':100:', ':1234:',
':one:', ':two:', ':three:', ':four:', ':five:', ':six:', ':seven:',
':eight:', ':nine:', ':keycap_ten:', ':zero:', ':hash:', ':symbols:',
':arrow_backward:', ':arrow_down:', ':arrow_forward:', ':arrow_left:',
':capital_abcd:', ':abcd:', ':abc:', ':arrow_lower_left:',
':arrow_lower_right:', ':arrow_right:', ':arrow_up:',
':arrow_upper_left:', ':arrow_upper_right:', ':arrow_double_down:',
':arrow_double_up:', ':arrow_down_small:', ':arrow_heading_down:',
':arrow_heading_up:', ':leftwards_arrow_with_hook:', ':arrow_right_hook:',
':left_right_arrow:', ':arrow_up_down:', ':arrow_up_small:',
':arrows_clockwise:', ':arrows_counterclockwise:', ':rewind:',
':fast_forward:', ':information_source:', ':ok:',
':twisted_rightwards_arrows:', ':repeat:', ':repeat_one:', ':new:',
':top:', ':up:', ':cool:', ':free:', ':ng:', ':cinema:', ':koko:',
':signal_strength:', ':u5272:', ':u5408:', ':u55b6:', ':u6307:',
':u6708:', ':u6709:', ':u6e80:', ':u7121:', ':u7533:', ':u7a7a:',
':u7981:', ':sa:', ':restroom:', ':mens:', ':womens:', ':baby_symbol:',
':no_smoking:', ':parking:', ':wheelchair:', ':metro:', ':baggage_claim:',
':accept:', ':wc:', ':potable_water:', ':put_litter_in_its_place:',
':secret:', ':congratulations:', ':m:', ':passport_control:',
':left_luggage:', ':customs:', ':ideograph_advantage:', ':cl:', ':sos:',
':id:', ':no_entry_sign:', ':underage:', ':no_mobile_phones:',
':do_not_litter:', ':non-potable_water:', ':no_bicycles:',
':no_pedestrians:', ':children_crossing:', ':no_entry:',
':eight_spoked_asterisk:', ':eight_pointed_black_star:',
':heart_decoration:', ':vs:', ':vibration_mode:', ':mobile_phone_off:',
':chart:', ':currency_exchange:', ':aries:', ':taurus:', ':gemini:',
':cancer:', ':leo:', ':virgo:', ':libra:', ':scorpius:', ':sagittarius:',
':capricorn:', ':aquarius:', ':pisces:', ':ophiuchus:',
':six_pointed_star:', ':negative_squared_cross_mark:', ':a:', ':b:',
':ab:', ':o2:', ':diamond_shape_with_a_dot_inside:', ':recycle:', ':end:',
':on:', ':soon:', ':clock1:', ':clock130:', ':clock10:', ':clock1030:',
':clock11:', ':clock1130:', ':clock12:', ':clock1230:', ':clock2:',
':clock230:', ':clock3:', ':clock330:', ':clock4:', ':clock430:',
':clock5:', ':clock530:', ':clock6:', ':clock630:', ':clock7:',
':clock730:', ':clock8:', ':clock830:', ':clock9:', ':clock930:',
':heavy_dollar_sign:', ':copyright:', ':registered:', ':tm:', ':x:',
':heavy_exclamation_mark:', ':bangbang:', ':interrobang:', ':o:',
':heavy_multiplication_x:', ':heavy_plus_sign:', ':heavy_minus_sign:',
':heavy_division_sign:', ':white_flower:', ':heavy_check_mark:',
':ballot_box_with_check:', ':radio_button:', ':link:', ':curly_loop:',
':wavy_dash:', ':part_alternation_mark:', ':trident:', ':black_square:',
':white_square:', ':white_check_mark:', ':black_square_button:',
':white_square_button:', ':black_circle:', ':white_circle:',
':red_circle:', ':large_blue_circle:', ':large_blue_diamond:',
':large_orange_diamond:', ':small_blue_diamond:',
':small_orange_diamond:', ':small_red_triangle:',
':small_red_triangle_down:', ':shipit:'];

},{}],3:[function(require,module,exports){
module.exports={
  "name": "ocf-emoji",
  "version": "0.0.1",
  "main": "./plugin.js",
  "open-chat-framework": {
    "namespace": "emoji"
  },
  "devDependencies": {
    "chai": "^3.5.0",
    "mocha": "^3.3.0"
  }
}

},{}],4:[function(require,module,exports){
let emojis = require('./emoji.js');

// this is an example of middleware used in our test.js
// adds some text to message before it's sent and when it's received
module.exports = (config) => {

    // regular expression to find emoji strings
    const test = /:[a-z0-9_\-\+]+:/g;

    // create empty config object if not supplied
    config = config || {};

    config.height = config.height || 16;

    // where emoji images are hosted. filename (ex: /smile.png) will be added
    config.url = config.url || 'http://www.webpagefx.com/tools/emoji-cheat-sheet/graphics/emojis';

    // function to parse string for :smile: and other emoji
    const emoji = (someString, url = config.url, height = config.height) => someString.replace(test, (match) => {

        // use regex to find emoji and replace with html
        let result = match;

        // if text string is in list of emojis
        if (emojis.indexOf(match) !== -1) {

            // remove the : before and after
            let name = String(match).slice(1, -1);

            // return html image, using url and height supplied in
            // function
            result = '<img class="emoji" title=":' + name
                + ':" alt="' + name + '" src="' + url + '/'
                + encodeURIComponent(name) + '.png"'
                + (height ? (' height="' + height + '"') : '')
                + ' />';

        }

        return result;

    });

    let parseEmoji = function(payload, next) {
        
        if(payload.data.text) {
            // parse emoji
            payload.data.text = emoji(payload.data.text, config.url, config.height);
        }

        // continue along middleware
        next(null, payload);

    };

    // define middleware to run after a message has been received and OCF has processed it
    let broadcast = {
        'message': parseEmoji,
        '$history.message': parseEmoji
    };

    // these are new methods that will be added to the extended class
    class extension {
        render(string, url, height) {
            return emoji(string, url, height);
        }
        search(query) {

            var results = [];
            
            for(var i in emojis) {
                if(emojis[i].substring(0, query.length) == query) {
                    results.push(emojis[i]);
                }
            }

            return results;

        }
    }

    // middleware tells the framework to use these functions when 
    // messages are sent or received
    return {
        namespace,
        middleware: {
            broadcast: broadcast
        },
        extends: {
            Chat: extension,
            GlobalChat: extension
        }
    }
}

},{"./emoji.js":2}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy5udm0vdmVyc2lvbnMvbm9kZS92Ni43LjAvbGliL25vZGVfbW9kdWxlcy9vY2YtcGx1Z2luL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIudG1wL3dyYXAuanMiLCJlbW9qaS5qcyIsInBhY2thZ2UuanNvbiIsInBsdWdpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiKGZ1bmN0aW9uKCkge1xuXG4gICAgY29uc3QgbmFtZXNwYWNlID0gcmVxdWlyZSgnLi4vcGFja2FnZS5qc29uJylbJ29wZW4tY2hhdC1mcmFtZXdvcmsnXVsnbmFtZXNwYWNlJ107XG4gICAgd2luZG93Lk9wZW5DaGF0RnJhbWV3b3JrLnBsdWdpbltuYW1lc3BhY2VdID0gcmVxdWlyZSgnLi4vcGx1Z2luLmpzJyk7XG5cbn0pKCk7XG4iLCIvLyBhZGFwdGVkIGZyb21cbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9IZW5yaWtKb3JldGVnL2Vtb2ppLWltYWdlcy9ibG9iL21hc3Rlci9lbW9qaS1pbWFnZXMuanNcblxuLy8gbGlzdCBvZiBlbW9qaWkgdGV4dCB0byBwYXJzZVxubW9kdWxlLmV4cG9ydHMgPSBbJzpibHVzaDonLCAnOnNjcmVhbTonLCAnOnNtaXJrOicsICc6c21pbGV5OicsXG4nOnN0dWNrX291dF90b25ndWVfY2xvc2VkX2V5ZXM6JywgJzpzdHVja19vdXRfdG9uZ3VlX3dpbmtpbmdfZXllOicsXG4nOnJhZ2U6JywgJzpkaXNhcHBvaW50ZWQ6JywgJzpzb2I6JywgJzpraXNzaW5nX2hlYXJ0OicsICc6d2luazonLFxuJzpwZW5zaXZlOicsICc6Y29uZm91bmRlZDonLCAnOmZsdXNoZWQ6JywgJzpyZWxheGVkOicsICc6bWFzazonLFxuJzpoZWFydDonLCAnOmJyb2tlbl9oZWFydDonLCAnOnN1bm55OicsICc6dW1icmVsbGE6JywgJzpjbG91ZDonLFxuJzpzbm93Zmxha2U6JywgJzpzbm93bWFuOicsICc6emFwOicsICc6Y3ljbG9uZTonLCAnOmZvZ2d5OicsICc6b2NlYW46Jyxcbic6Y2F0OicsICc6ZG9nOicsICc6bW91c2U6JywgJzpoYW1zdGVyOicsICc6cmFiYml0OicsICc6d29sZjonLCAnOmZyb2c6Jyxcbic6dGlnZXI6JywgJzprb2FsYTonLCAnOmJlYXI6JywgJzpwaWc6JywgJzpwaWdfbm9zZTonLCAnOmNvdzonLCAnOmJvYXI6Jyxcbic6bW9ua2V5X2ZhY2U6JywgJzptb25rZXk6JywgJzpob3JzZTonLCAnOnJhY2Vob3JzZTonLCAnOmNhbWVsOicsXG4nOnNoZWVwOicsICc6ZWxlcGhhbnQ6JywgJzpwYW5kYV9mYWNlOicsICc6c25ha2U6JywgJzpiaXJkOicsXG4nOmJhYnlfY2hpY2s6JywgJzpoYXRjaGVkX2NoaWNrOicsICc6aGF0Y2hpbmdfY2hpY2s6JywgJzpjaGlja2VuOicsXG4nOnBlbmd1aW46JywgJzp0dXJ0bGU6JywgJzpidWc6JywgJzpob25leWJlZTonLCAnOmFudDonLCAnOmJlZXRsZTonLFxuJzpzbmFpbDonLCAnOm9jdG9wdXM6JywgJzp0cm9waWNhbF9maXNoOicsICc6ZmlzaDonLCAnOndoYWxlOicsXG4nOndoYWxlMjonLCAnOmRvbHBoaW46JywgJzpjb3cyOicsICc6cmFtOicsICc6cmF0OicsICc6d2F0ZXJfYnVmZmFsbzonLFxuJzp0aWdlcjI6JywgJzpyYWJiaXQyOicsICc6ZHJhZ29uOicsICc6Z29hdDonLCAnOnJvb3N0ZXI6JywgJzpkb2cyOicsXG4nOnBpZzI6JywgJzptb3VzZTI6JywgJzpveDonLCAnOmRyYWdvbl9mYWNlOicsICc6Ymxvd2Zpc2g6Jyxcbic6Y3JvY29kaWxlOicsICc6ZHJvbWVkYXJ5X2NhbWVsOicsICc6bGVvcGFyZDonLCAnOmNhdDI6JywgJzpwb29kbGU6Jyxcbic6cGF3X3ByaW50czonLCAnOmJvdXF1ZXQ6JywgJzpjaGVycnlfYmxvc3NvbTonLCAnOnR1bGlwOicsXG4nOmZvdXJfbGVhZl9jbG92ZXI6JywgJzpyb3NlOicsICc6c3VuZmxvd2VyOicsICc6aGliaXNjdXM6Jyxcbic6bWFwbGVfbGVhZjonLCAnOmxlYXZlczonLCAnOmZhbGxlbl9sZWFmOicsICc6aGVyYjonLCAnOm11c2hyb29tOicsXG4nOmNhY3R1czonLCAnOnBhbG1fdHJlZTonLCAnOmV2ZXJncmVlbl90cmVlOicsICc6ZGVjaWR1b3VzX3RyZWU6Jyxcbic6Y2hlc3RudXQ6JywgJzpzZWVkbGluZzonLCAnOmJsb3Nzb206JywgJzplYXJfb2ZfcmljZTonLCAnOnNoZWxsOicsXG4nOmdsb2JlX3dpdGhfbWVyaWRpYW5zOicsICc6c3VuX3dpdGhfZmFjZTonLCAnOmZ1bGxfbW9vbl93aXRoX2ZhY2U6Jyxcbic6bmV3X21vb25fd2l0aF9mYWNlOicsICc6bmV3X21vb246JywgJzp3YXhpbmdfY3Jlc2NlbnRfbW9vbjonLFxuJzpmaXJzdF9xdWFydGVyX21vb246JywgJzp3YXhpbmdfZ2liYm91c19tb29uOicsICc6ZnVsbF9tb29uOicsXG4nOndhbmluZ19naWJib3VzX21vb246JywgJzpsYXN0X3F1YXJ0ZXJfbW9vbjonLCAnOndhbmluZ19jcmVzY2VudF9tb29uOicsXG4nOmxhc3RfcXVhcnRlcl9tb29uX3dpdGhfZmFjZTonLCAnOmZpcnN0X3F1YXJ0ZXJfbW9vbl93aXRoX2ZhY2U6Jyxcbic6bW9vbjonLCAnOmVhcnRoX2FmcmljYTonLCAnOmVhcnRoX2FtZXJpY2FzOicsICc6ZWFydGhfYXNpYTonLFxuJzp2b2xjYW5vOicsICc6bWlsa3lfd2F5OicsICc6cGFydGx5X3N1bm55OicsICc6b2N0b2NhdDonLCAnOnNxdWlycmVsOicsXG4nOmJhbWJvbzonLCAnOmdpZnRfaGVhcnQ6JywgJzpkb2xsczonLCAnOnNjaG9vbF9zYXRjaGVsOicsXG4nOm1vcnRhcl9ib2FyZDonLCAnOmZsYWdzOicsICc6ZmlyZXdvcmtzOicsICc6c3BhcmtsZXI6JywgJzp3aW5kX2NoaW1lOicsXG4nOnJpY2Vfc2NlbmU6JywgJzpqYWNrX29fbGFudGVybjonLCAnOmdob3N0OicsICc6c2FudGE6Jyxcbic6Y2hyaXN0bWFzX3RyZWU6JywgJzpnaWZ0OicsICc6YmVsbDonLCAnOm5vX2JlbGw6JywgJzp0YW5hYmF0YV90cmVlOicsXG4nOnRhZGE6JywgJzpjb25mZXR0aV9iYWxsOicsICc6YmFsbG9vbjonLCAnOmNyeXN0YWxfYmFsbDonLCAnOmNkOicsXG4nOmR2ZDonLCAnOmZsb3BweV9kaXNrOicsICc6Y2FtZXJhOicsICc6dmlkZW9fY2FtZXJhOicsICc6bW92aWVfY2FtZXJhOicsXG4nOmNvbXB1dGVyOicsICc6dHY6JywgJzppcGhvbmU6JywgJzpwaG9uZTonLCAnOnRlbGVwaG9uZTonLFxuJzp0ZWxlcGhvbmVfcmVjZWl2ZXI6JywgJzpwYWdlcjonLCAnOmZheDonLCAnOm1pbmlkaXNjOicsICc6dmhzOicsXG4nOnNvdW5kOicsICc6c3BlYWtlcjonLCAnOm11dGU6JywgJzpsb3Vkc3BlYWtlcjonLCAnOm1lZ2E6Jyxcbic6aG91cmdsYXNzOicsICc6aG91cmdsYXNzX2Zsb3dpbmdfc2FuZDonLCAnOmFsYXJtX2Nsb2NrOicsICc6d2F0Y2g6Jyxcbic6cmFkaW86JywgJzpzYXRlbGxpdGU6JywgJzpsb29wOicsICc6bWFnOicsICc6bWFnX3JpZ2h0OicsICc6dW5sb2NrOicsXG4nOmxvY2s6JywgJzpsb2NrX3dpdGhfaW5rX3BlbjonLCAnOmNsb3NlZF9sb2NrX3dpdGhfa2V5OicsICc6a2V5OicsXG4nOmJ1bGI6JywgJzpmbGFzaGxpZ2h0OicsICc6aGlnaF9icmlnaHRuZXNzOicsICc6bG93X2JyaWdodG5lc3M6Jyxcbic6ZWxlY3RyaWNfcGx1ZzonLCAnOmJhdHRlcnk6JywgJzpjYWxsaW5nOicsICc6ZW1haWw6JywgJzptYWlsYm94OicsXG4nOnBvc3Rib3g6JywgJzpiYXRoOicsICc6YmF0aHR1YjonLCAnOnNob3dlcjonLCAnOnRvaWxldDonLCAnOndyZW5jaDonLFxuJzpudXRfYW5kX2JvbHQ6JywgJzpoYW1tZXI6JywgJzpzZWF0OicsICc6bW9uZXliYWc6JywgJzp5ZW46JywgJzpkb2xsYXI6Jyxcbic6cG91bmQ6JywgJzpldXJvOicsICc6Y3JlZGl0X2NhcmQ6JywgJzptb25leV93aXRoX3dpbmdzOicsICc6ZS1tYWlsOicsXG4nOmluYm94X3RyYXk6JywgJzpvdXRib3hfdHJheTonLCAnOmVudmVsb3BlOicsICc6aW5jb21pbmdfZW52ZWxvcGU6Jyxcbic6cG9zdGFsX2hvcm46JywgJzptYWlsYm94X2Nsb3NlZDonLCAnOm1haWxib3hfd2l0aF9tYWlsOicsXG4nOm1haWxib3hfd2l0aF9ub19tYWlsOicsICc6ZG9vcjonLCAnOnNtb2tpbmc6JywgJzpib21iOicsICc6Z3VuOicsXG4nOmhvY2hvOicsICc6cGlsbDonLCAnOnN5cmluZ2U6JywgJzpwYWdlX2ZhY2luZ191cDonLCAnOnBhZ2Vfd2l0aF9jdXJsOicsXG4nOmJvb2ttYXJrX3RhYnM6JywgJzpiYXJfY2hhcnQ6JywgJzpjaGFydF93aXRoX3Vwd2FyZHNfdHJlbmQ6Jyxcbic6Y2hhcnRfd2l0aF9kb3dud2FyZHNfdHJlbmQ6JywgJzpzY3JvbGw6JywgJzpjbGlwYm9hcmQ6JywgJzpjYWxlbmRhcjonLFxuJzpkYXRlOicsICc6Y2FyZF9pbmRleDonLCAnOmZpbGVfZm9sZGVyOicsICc6b3Blbl9maWxlX2ZvbGRlcjonLFxuJzpzY2lzc29yczonLCAnOnB1c2hwaW46JywgJzpwYXBlcmNsaXA6JywgJzpibGFja19uaWI6JywgJzpwZW5jaWwyOicsXG4nOnN0cmFpZ2h0X3J1bGVyOicsICc6dHJpYW5ndWxhcl9ydWxlcjonLCAnOmNsb3NlZF9ib29rOicsICc6Z3JlZW5fYm9vazonLFxuJzpibHVlX2Jvb2s6JywgJzpvcmFuZ2VfYm9vazonLCAnOm5vdGVib29rOicsXG4nOm5vdGVib29rX3dpdGhfZGVjb3JhdGl2ZV9jb3ZlcjonLCAnOmxlZGdlcjonLCAnOmJvb2tzOicsICc6Ym9va21hcms6Jyxcbic6bmFtZV9iYWRnZTonLCAnOm1pY3Jvc2NvcGU6JywgJzp0ZWxlc2NvcGU6JywgJzpuZXdzcGFwZXI6Jyxcbic6Zm9vdGJhbGw6JywgJzpiYXNrZXRiYWxsOicsICc6c29jY2VyOicsICc6YmFzZWJhbGw6JywgJzp0ZW5uaXM6Jyxcbic6OGJhbGw6JywgJzpydWdieV9mb290YmFsbDonLCAnOmJvd2xpbmc6JywgJzpnb2xmOicsXG4nOm1vdW50YWluX2JpY3ljbGlzdDonLCAnOmJpY3ljbGlzdDonLCAnOmhvcnNlX3JhY2luZzonLCAnOnNub3dib2FyZGVyOicsXG4nOnN3aW1tZXI6JywgJzpzdXJmZXI6JywgJzpza2k6JywgJzpzcGFkZXM6JywgJzpoZWFydHM6JywgJzpjbHViczonLFxuJzpkaWFtb25kczonLCAnOmdlbTonLCAnOnJpbmc6JywgJzp0cm9waHk6JywgJzptdXNpY2FsX3Njb3JlOicsXG4nOm11c2ljYWxfa2V5Ym9hcmQ6JywgJzp2aW9saW46JywgJzpzcGFjZV9pbnZhZGVyOicsICc6dmlkZW9fZ2FtZTonLFxuJzpibGFja19qb2tlcjonLCAnOmZsb3dlcl9wbGF5aW5nX2NhcmRzOicsICc6Z2FtZV9kaWU6JywgJzpkYXJ0OicsXG4nOm1haGpvbmc6JywgJzpjbGFwcGVyOicsICc6bWVtbzonLCAnOnBlbmNpbDonLCAnOmJvb2s6JywgJzphcnQ6Jyxcbic6bWljcm9waG9uZTonLCAnOmhlYWRwaG9uZXM6JywgJzp0cnVtcGV0OicsICc6c2F4b3Bob25lOicsICc6Z3VpdGFyOicsXG4nOnNob2U6JywgJzpzYW5kYWw6JywgJzpoaWdoX2hlZWw6JywgJzpsaXBzdGljazonLCAnOmJvb3Q6JywgJzpzaGlydDonLFxuJzp0c2hpcnQ6JywgJzpuZWNrdGllOicsICc6d29tYW5zX2Nsb3RoZXM6JywgJzpkcmVzczonLFxuJzpydW5uaW5nX3NoaXJ0X3dpdGhfc2FzaDonLCAnOmplYW5zOicsICc6a2ltb25vOicsICc6YmlraW5pOicsXG4nOnJpYmJvbjonLCAnOnRvcGhhdDonLCAnOmNyb3duOicsICc6d29tYW5zX2hhdDonLCAnOm1hbnNfc2hvZTonLFxuJzpjbG9zZWRfdW1icmVsbGE6JywgJzpicmllZmNhc2U6JywgJzpoYW5kYmFnOicsICc6cG91Y2g6JywgJzpwdXJzZTonLFxuJzpleWVnbGFzc2VzOicsICc6ZmlzaGluZ19wb2xlX2FuZF9maXNoOicsICc6Y29mZmVlOicsICc6dGVhOicsICc6c2FrZTonLFxuJzpiYWJ5X2JvdHRsZTonLCAnOmJlZXI6JywgJzpiZWVyczonLCAnOmNvY2t0YWlsOicsICc6dHJvcGljYWxfZHJpbms6Jyxcbic6d2luZV9nbGFzczonLCAnOmZvcmtfYW5kX2tuaWZlOicsICc6cGl6emE6JywgJzpoYW1idXJnZXI6JywgJzpmcmllczonLFxuJzpwb3VsdHJ5X2xlZzonLCAnOm1lYXRfb25fYm9uZTonLCAnOnNwYWdoZXR0aTonLCAnOmN1cnJ5OicsXG4nOmZyaWVkX3NocmltcDonLCAnOmJlbnRvOicsICc6c3VzaGk6JywgJzpmaXNoX2Nha2U6JywgJzpyaWNlX2JhbGw6Jyxcbic6cmljZV9jcmFja2VyOicsICc6cmljZTonLCAnOnJhbWVuOicsICc6c3RldzonLCAnOm9kZW46JywgJzpkYW5nbzonLFxuJzplZ2c6JywgJzpicmVhZDonLCAnOmRvdWdobnV0OicsICc6Y3VzdGFyZDonLCAnOmljZWNyZWFtOicsXG4nOmljZV9jcmVhbTonLCAnOnNoYXZlZF9pY2U6JywgJzpiaXJ0aGRheTonLCAnOmNha2U6JywgJzpjb29raWU6Jyxcbic6Y2hvY29sYXRlX2JhcjonLCAnOmNhbmR5OicsICc6bG9sbGlwb3A6JywgJzpob25leV9wb3Q6JywgJzphcHBsZTonLFxuJzpncmVlbl9hcHBsZTonLCAnOnRhbmdlcmluZTonLCAnOmxlbW9uOicsICc6Y2hlcnJpZXM6JywgJzpncmFwZXM6Jyxcbic6d2F0ZXJtZWxvbjonLCAnOnN0cmF3YmVycnk6JywgJzpwZWFjaDonLCAnOm1lbG9uOicsICc6YmFuYW5hOicsXG4nOnBlYXI6JywgJzpwaW5lYXBwbGU6JywgJzpzd2VldF9wb3RhdG86JywgJzplZ2dwbGFudDonLCAnOnRvbWF0bzonLFxuJzpjb3JuOicsICc6YWxpZW46JywgJzphbmdlbDonLCAnOmFuZ2VyOicsICc6YW5ncnk6JywgJzphbmd1aXNoZWQ6Jyxcbic6YXN0b25pc2hlZDonLCAnOmJhYnk6JywgJzpibHVlX2hlYXJ0OicsICc6Ymx1c2g6JywgJzpib29tOicsICc6Ym93OicsXG4nOmJvd3RpZTonLCAnOmJveTonLCAnOmJyaWRlX3dpdGhfdmVpbDonLCAnOmJyb2tlbl9oZWFydDonLFxuJzpidXN0X2luX3NpbGhvdWV0dGU6JywgJzpidXN0c19pbl9zaWxob3VldHRlOicsICc6Y2xhcDonLCAnOmNvbGRfc3dlYXQ6Jyxcbic6Y29sbGlzaW9uOicsICc6Y29uZm91bmRlZDonLCAnOmNvbmZ1c2VkOicsICc6Y29uc3RydWN0aW9uX3dvcmtlcjonLFxuJzpjb3A6JywgJzpjb3VwbGVfd2l0aF9oZWFydDonLCAnOmNvdXBsZTonLCAnOmNvdXBsZWtpc3M6JywgJzpjcnk6Jyxcbic6Y3J5aW5nX2NhdF9mYWNlOicsICc6Y3VwaWQ6JywgJzpkYW5jZXI6JywgJzpkYW5jZXJzOicsICc6ZGFzaDonLFxuJzpkaXNhcHBvaW50ZWQ6JywgJzpkaXp6eV9mYWNlOicsICc6ZGl6enk6JywgJzpkcm9wbGV0OicsICc6ZWFyOicsXG4nOmV4Y2xhbWF0aW9uOicsICc6ZXhwcmVzc2lvbmxlc3M6JywgJzpleWVzOicsICc6ZmFjZXB1bmNoOicsICc6ZmFtaWx5OicsXG4nOmZlYXJmdWw6JywgJzpmZWVsc2dvb2Q6JywgJzpmZWV0OicsICc6ZmlubmFkaWU6JywgJzpmaXJlOicsICc6ZmlzdDonLFxuJzpmbHVzaGVkOicsICc6ZnJvd25pbmc6JywgJzpnaXJsOicsICc6Z29iZXJzZXJrOicsICc6Z29kbW9kZTonLFxuJzpncmVlbl9oZWFydDonLCAnOmdyZXlfZXhjbGFtYXRpb246JywgJzpncmV5X3F1ZXN0aW9uOicsICc6Z3JpbWFjaW5nOicsXG4nOmdyaW46JywgJzpncmlubmluZzonLCAnOmd1YXJkc21hbjonLCAnOmhhaXJjdXQ6JywgJzpoYW5kOicsICc6aGFua2V5OicsXG4nOmhlYXJfbm9fZXZpbDonLCAnOmhlYXJ0X2V5ZXNfY2F0OicsICc6aGVhcnRfZXllczonLCAnOmhlYXJ0OicsXG4nOmhlYXJ0YmVhdDonLCAnOmhlYXJ0cHVsc2U6JywgJzpodXJ0cmVhbGJhZDonLCAnOmh1c2hlZDonLCAnOmltcDonLFxuJzppbmZvcm1hdGlvbl9kZXNrX3BlcnNvbjonLCAnOmlubm9jZW50OicsICc6amFwYW5lc2VfZ29ibGluOicsXG4nOmphcGFuZXNlX29ncmU6JywgJzpqb3lfY2F0OicsICc6am95OicsICc6a2lzczonLCAnOmtpc3NpbmdfY2F0OicsXG4nOmtpc3NpbmdfY2xvc2VkX2V5ZXM6JywgJzpraXNzaW5nX2hlYXJ0OicsICc6a2lzc2luZ19zbWlsaW5nX2V5ZXM6Jyxcbic6a2lzc2luZzonLCAnOmxhdWdoaW5nOicsICc6bGlwczonLCAnOmxvdmVfbGV0dGVyOicsXG4nOm1hbl93aXRoX2d1YV9waV9tYW86JywgJzptYW5fd2l0aF90dXJiYW46JywgJzptYW46JywgJzptYXNrOicsXG4nOm1hc3NhZ2U6JywgJzptZXRhbDonLCAnOm11c2NsZTonLCAnOm11c2ljYWxfbm90ZTonLCAnOm5haWxfY2FyZTonLFxuJzpuZWNrYmVhcmQ6JywgJzpuZXV0cmFsX2ZhY2U6JywgJzpub19nb29kOicsICc6bm9fbW91dGg6JywgJzpub3NlOicsXG4nOm5vdGVzOicsICc6b2tfaGFuZDonLCAnOm9rX3dvbWFuOicsICc6b2xkZXJfbWFuOicsICc6b2xkZXJfd29tYW46Jyxcbic6b3Blbl9oYW5kczonLCAnOm9wZW5fbW91dGg6JywgJzpwZW5zaXZlOicsICc6cGVyc2V2ZXJlOicsXG4nOnBlcnNvbl9mcm93bmluZzonLCAnOnBlcnNvbl93aXRoX2Jsb25kX2hhaXI6Jyxcbic6cGVyc29uX3dpdGhfcG91dGluZ19mYWNlOicsICc6cG9pbnRfZG93bjonLCAnOnBvaW50X2xlZnQ6Jyxcbic6cG9pbnRfcmlnaHQ6JywgJzpwb2ludF91cF8yOicsICc6cG9pbnRfdXA6JywgJzpwb29wOicsICc6cG91dGluZ19jYXQ6Jyxcbic6cHJheTonLCAnOnByaW5jZXNzOicsICc6cHVuY2g6JywgJzpwdXJwbGVfaGVhcnQ6JywgJzpxdWVzdGlvbjonLFxuJzpyYWdlOicsICc6cmFnZTE6JywgJzpyYWdlMjonLCAnOnJhZ2UzOicsICc6cmFnZTQ6JywgJzpyYWlzZWRfaGFuZDonLFxuJzpyYWlzZWRfaGFuZHM6JywgJzpyZWxheGVkOicsICc6cmVsaWV2ZWQ6JywgJzpyZXZvbHZpbmdfaGVhcnRzOicsXG4nOnJ1bm5lcjonLCAnOnJ1bm5pbmc6JywgJzpzYXRpc2ZpZWQ6JywgJzpzY3JlYW1fY2F0OicsICc6c2NyZWFtOicsXG4nOnNlZV9ub19ldmlsOicsICc6c2hpdDonLCAnOnNrdWxsOicsICc6c2xlZXBpbmc6JywgJzpzbGVlcHk6Jyxcbic6c21pbGVfY2F0OicsICc6c21pbGU6JywgJzpzbWlsZXlfY2F0OicsICc6c21pbGV5OicsICc6c21pbGluZ19pbXA6Jyxcbic6c21pcmtfY2F0OicsICc6c21pcms6JywgJzpzb2I6JywgJzpzcGFya2xpbmdfaGVhcnQ6JywgJzpzcGFya2xlczonLFxuJzpzcGVha19ub19ldmlsOicsICc6c3BlZWNoX2JhbGxvb246JywgJzpzdGFyOicsICc6c3RhcjI6Jyxcbic6c3R1Y2tfb3V0X3Rvbmd1ZV9jbG9zZWRfZXllczonLCAnOnN0dWNrX291dF90b25ndWVfd2lua2luZ19leWU6Jyxcbic6c3R1Y2tfb3V0X3Rvbmd1ZTonLCAnOnN1bmdsYXNzZXM6JywgJzpzdXNwZWN0OicsICc6c3dlYXRfZHJvcHM6Jyxcbic6c3dlYXRfc21pbGU6JywgJzpzd2VhdDonLCAnOnRob3VnaHRfYmFsbG9vbjonLCAnOi0xOicsICc6dGh1bWJzZG93bjonLFxuJzp0aHVtYnN1cDonLCAnOisxOicsICc6dGlyZWRfZmFjZTonLCAnOnRvbmd1ZTonLCAnOnRyaXVtcGg6Jyxcbic6dHJvbGxmYWNlOicsICc6dHdvX2hlYXJ0czonLCAnOnR3b19tZW5faG9sZGluZ19oYW5kczonLFxuJzp0d29fd29tZW5faG9sZGluZ19oYW5kczonLCAnOnVuYW11c2VkOicsICc6djonLCAnOndhbGtpbmc6JywgJzp3YXZlOicsXG4nOndlYXJ5OicsICc6d2luazI6JywgJzp3aW5rOicsICc6d29tYW46JywgJzp3b3JyaWVkOicsICc6eWVsbG93X2hlYXJ0OicsXG4nOnl1bTonLCAnOnp6ejonLCAnOjEwOTonLCAnOmhvdXNlOicsICc6aG91c2Vfd2l0aF9nYXJkZW46JywgJzpzY2hvb2w6Jyxcbic6b2ZmaWNlOicsICc6cG9zdF9vZmZpY2U6JywgJzpob3NwaXRhbDonLCAnOmJhbms6Jyxcbic6Y29udmVuaWVuY2Vfc3RvcmU6JywgJzpsb3ZlX2hvdGVsOicsICc6aG90ZWw6JywgJzp3ZWRkaW5nOicsICc6Y2h1cmNoOicsXG4nOmRlcGFydG1lbnRfc3RvcmU6JywgJzpldXJvcGVhbl9wb3N0X29mZmljZTonLCAnOmNpdHlfc3VucmlzZTonLFxuJzpjaXR5X3N1bnNldDonLCAnOmphcGFuZXNlX2Nhc3RsZTonLCAnOmV1cm9wZWFuX2Nhc3RsZTonLCAnOnRlbnQ6Jyxcbic6ZmFjdG9yeTonLCAnOnRva3lvX3Rvd2VyOicsICc6amFwYW46JywgJzptb3VudF9mdWppOicsXG4nOnN1bnJpc2Vfb3Zlcl9tb3VudGFpbnM6JywgJzpzdW5yaXNlOicsICc6c3RhcnM6JywgJzpzdGF0dWVfb2ZfbGliZXJ0eTonLFxuJzpicmlkZ2VfYXRfbmlnaHQ6JywgJzpjYXJvdXNlbF9ob3JzZTonLCAnOnJhaW5ib3c6JywgJzpmZXJyaXNfd2hlZWw6Jyxcbic6Zm91bnRhaW46JywgJzpyb2xsZXJfY29hc3RlcjonLCAnOnNoaXA6JywgJzpzcGVlZGJvYXQ6JywgJzpib2F0OicsXG4nOnNhaWxib2F0OicsICc6cm93Ym9hdDonLCAnOmFuY2hvcjonLCAnOnJvY2tldDonLCAnOmFpcnBsYW5lOicsXG4nOmhlbGljb3B0ZXI6JywgJzpzdGVhbV9sb2NvbW90aXZlOicsICc6dHJhbTonLCAnOm1vdW50YWluX3JhaWx3YXk6Jyxcbic6YmlrZTonLCAnOmFlcmlhbF90cmFtd2F5OicsICc6c3VzcGVuc2lvbl9yYWlsd2F5OicsXG4nOm1vdW50YWluX2NhYmxld2F5OicsICc6dHJhY3RvcjonLCAnOmJsdWVfY2FyOicsICc6b25jb21pbmdfYXV0b21vYmlsZTonLFxuJzpjYXI6JywgJzpyZWRfY2FyOicsICc6dGF4aTonLCAnOm9uY29taW5nX3RheGk6JywgJzphcnRpY3VsYXRlZF9sb3JyeTonLFxuJzpidXM6JywgJzpvbmNvbWluZ19idXM6JywgJzpyb3RhdGluZ19saWdodDonLCAnOnBvbGljZV9jYXI6Jyxcbic6b25jb21pbmdfcG9saWNlX2NhcjonLCAnOmZpcmVfZW5naW5lOicsICc6YW1idWxhbmNlOicsICc6bWluaWJ1czonLFxuJzp0cnVjazonLCAnOnRyYWluOicsICc6c3RhdGlvbjonLCAnOnRyYWluMjonLCAnOmJ1bGxldHRyYWluX2Zyb250OicsXG4nOmJ1bGxldHRyYWluX3NpZGU6JywgJzpsaWdodF9yYWlsOicsICc6bW9ub3JhaWw6JywgJzpyYWlsd2F5X2NhcjonLFxuJzp0cm9sbGV5YnVzOicsICc6dGlja2V0OicsICc6ZnVlbHB1bXA6JywgJzp2ZXJ0aWNhbF90cmFmZmljX2xpZ2h0OicsXG4nOnRyYWZmaWNfbGlnaHQ6JywgJzp3YXJuaW5nOicsICc6Y29uc3RydWN0aW9uOicsICc6YmVnaW5uZXI6JywgJzphdG06Jyxcbic6c2xvdF9tYWNoaW5lOicsICc6YnVzc3RvcDonLCAnOmJhcmJlcjonLCAnOmhvdHNwcmluZ3M6Jyxcbic6Y2hlY2tlcmVkX2ZsYWc6JywgJzpjcm9zc2VkX2ZsYWdzOicsICc6aXpha2F5YV9sYW50ZXJuOicsICc6bW95YWk6Jyxcbic6Y2lyY3VzX3RlbnQ6JywgJzpwZXJmb3JtaW5nX2FydHM6JywgJzpyb3VuZF9wdXNocGluOicsXG4nOnRyaWFuZ3VsYXJfZmxhZ19vbl9wb3N0OicsICc6anA6JywgJzprcjonLCAnOmNuOicsICc6dXM6JywgJzpmcjonLFxuJzplczonLCAnOml0OicsICc6cnU6JywgJzpnYjonLCAnOnVrOicsICc6ZGU6JywgJzoxMDA6JywgJzoxMjM0OicsXG4nOm9uZTonLCAnOnR3bzonLCAnOnRocmVlOicsICc6Zm91cjonLCAnOmZpdmU6JywgJzpzaXg6JywgJzpzZXZlbjonLFxuJzplaWdodDonLCAnOm5pbmU6JywgJzprZXljYXBfdGVuOicsICc6emVybzonLCAnOmhhc2g6JywgJzpzeW1ib2xzOicsXG4nOmFycm93X2JhY2t3YXJkOicsICc6YXJyb3dfZG93bjonLCAnOmFycm93X2ZvcndhcmQ6JywgJzphcnJvd19sZWZ0OicsXG4nOmNhcGl0YWxfYWJjZDonLCAnOmFiY2Q6JywgJzphYmM6JywgJzphcnJvd19sb3dlcl9sZWZ0OicsXG4nOmFycm93X2xvd2VyX3JpZ2h0OicsICc6YXJyb3dfcmlnaHQ6JywgJzphcnJvd191cDonLFxuJzphcnJvd191cHBlcl9sZWZ0OicsICc6YXJyb3dfdXBwZXJfcmlnaHQ6JywgJzphcnJvd19kb3VibGVfZG93bjonLFxuJzphcnJvd19kb3VibGVfdXA6JywgJzphcnJvd19kb3duX3NtYWxsOicsICc6YXJyb3dfaGVhZGluZ19kb3duOicsXG4nOmFycm93X2hlYWRpbmdfdXA6JywgJzpsZWZ0d2FyZHNfYXJyb3dfd2l0aF9ob29rOicsICc6YXJyb3dfcmlnaHRfaG9vazonLFxuJzpsZWZ0X3JpZ2h0X2Fycm93OicsICc6YXJyb3dfdXBfZG93bjonLCAnOmFycm93X3VwX3NtYWxsOicsXG4nOmFycm93c19jbG9ja3dpc2U6JywgJzphcnJvd3NfY291bnRlcmNsb2Nrd2lzZTonLCAnOnJld2luZDonLFxuJzpmYXN0X2ZvcndhcmQ6JywgJzppbmZvcm1hdGlvbl9zb3VyY2U6JywgJzpvazonLFxuJzp0d2lzdGVkX3JpZ2h0d2FyZHNfYXJyb3dzOicsICc6cmVwZWF0OicsICc6cmVwZWF0X29uZTonLCAnOm5ldzonLFxuJzp0b3A6JywgJzp1cDonLCAnOmNvb2w6JywgJzpmcmVlOicsICc6bmc6JywgJzpjaW5lbWE6JywgJzprb2tvOicsXG4nOnNpZ25hbF9zdHJlbmd0aDonLCAnOnU1MjcyOicsICc6dTU0MDg6JywgJzp1NTViNjonLCAnOnU2MzA3OicsXG4nOnU2NzA4OicsICc6dTY3MDk6JywgJzp1NmU4MDonLCAnOnU3MTIxOicsICc6dTc1MzM6JywgJzp1N2E3YTonLFxuJzp1Nzk4MTonLCAnOnNhOicsICc6cmVzdHJvb206JywgJzptZW5zOicsICc6d29tZW5zOicsICc6YmFieV9zeW1ib2w6Jyxcbic6bm9fc21va2luZzonLCAnOnBhcmtpbmc6JywgJzp3aGVlbGNoYWlyOicsICc6bWV0cm86JywgJzpiYWdnYWdlX2NsYWltOicsXG4nOmFjY2VwdDonLCAnOndjOicsICc6cG90YWJsZV93YXRlcjonLCAnOnB1dF9saXR0ZXJfaW5faXRzX3BsYWNlOicsXG4nOnNlY3JldDonLCAnOmNvbmdyYXR1bGF0aW9uczonLCAnOm06JywgJzpwYXNzcG9ydF9jb250cm9sOicsXG4nOmxlZnRfbHVnZ2FnZTonLCAnOmN1c3RvbXM6JywgJzppZGVvZ3JhcGhfYWR2YW50YWdlOicsICc6Y2w6JywgJzpzb3M6Jyxcbic6aWQ6JywgJzpub19lbnRyeV9zaWduOicsICc6dW5kZXJhZ2U6JywgJzpub19tb2JpbGVfcGhvbmVzOicsXG4nOmRvX25vdF9saXR0ZXI6JywgJzpub24tcG90YWJsZV93YXRlcjonLCAnOm5vX2JpY3ljbGVzOicsXG4nOm5vX3BlZGVzdHJpYW5zOicsICc6Y2hpbGRyZW5fY3Jvc3Npbmc6JywgJzpub19lbnRyeTonLFxuJzplaWdodF9zcG9rZWRfYXN0ZXJpc2s6JywgJzplaWdodF9wb2ludGVkX2JsYWNrX3N0YXI6Jyxcbic6aGVhcnRfZGVjb3JhdGlvbjonLCAnOnZzOicsICc6dmlicmF0aW9uX21vZGU6JywgJzptb2JpbGVfcGhvbmVfb2ZmOicsXG4nOmNoYXJ0OicsICc6Y3VycmVuY3lfZXhjaGFuZ2U6JywgJzphcmllczonLCAnOnRhdXJ1czonLCAnOmdlbWluaTonLFxuJzpjYW5jZXI6JywgJzpsZW86JywgJzp2aXJnbzonLCAnOmxpYnJhOicsICc6c2NvcnBpdXM6JywgJzpzYWdpdHRhcml1czonLFxuJzpjYXByaWNvcm46JywgJzphcXVhcml1czonLCAnOnBpc2NlczonLCAnOm9waGl1Y2h1czonLFxuJzpzaXhfcG9pbnRlZF9zdGFyOicsICc6bmVnYXRpdmVfc3F1YXJlZF9jcm9zc19tYXJrOicsICc6YTonLCAnOmI6Jyxcbic6YWI6JywgJzpvMjonLCAnOmRpYW1vbmRfc2hhcGVfd2l0aF9hX2RvdF9pbnNpZGU6JywgJzpyZWN5Y2xlOicsICc6ZW5kOicsXG4nOm9uOicsICc6c29vbjonLCAnOmNsb2NrMTonLCAnOmNsb2NrMTMwOicsICc6Y2xvY2sxMDonLCAnOmNsb2NrMTAzMDonLFxuJzpjbG9jazExOicsICc6Y2xvY2sxMTMwOicsICc6Y2xvY2sxMjonLCAnOmNsb2NrMTIzMDonLCAnOmNsb2NrMjonLFxuJzpjbG9jazIzMDonLCAnOmNsb2NrMzonLCAnOmNsb2NrMzMwOicsICc6Y2xvY2s0OicsICc6Y2xvY2s0MzA6Jyxcbic6Y2xvY2s1OicsICc6Y2xvY2s1MzA6JywgJzpjbG9jazY6JywgJzpjbG9jazYzMDonLCAnOmNsb2NrNzonLFxuJzpjbG9jazczMDonLCAnOmNsb2NrODonLCAnOmNsb2NrODMwOicsICc6Y2xvY2s5OicsICc6Y2xvY2s5MzA6Jyxcbic6aGVhdnlfZG9sbGFyX3NpZ246JywgJzpjb3B5cmlnaHQ6JywgJzpyZWdpc3RlcmVkOicsICc6dG06JywgJzp4OicsXG4nOmhlYXZ5X2V4Y2xhbWF0aW9uX21hcms6JywgJzpiYW5nYmFuZzonLCAnOmludGVycm9iYW5nOicsICc6bzonLFxuJzpoZWF2eV9tdWx0aXBsaWNhdGlvbl94OicsICc6aGVhdnlfcGx1c19zaWduOicsICc6aGVhdnlfbWludXNfc2lnbjonLFxuJzpoZWF2eV9kaXZpc2lvbl9zaWduOicsICc6d2hpdGVfZmxvd2VyOicsICc6aGVhdnlfY2hlY2tfbWFyazonLFxuJzpiYWxsb3RfYm94X3dpdGhfY2hlY2s6JywgJzpyYWRpb19idXR0b246JywgJzpsaW5rOicsICc6Y3VybHlfbG9vcDonLFxuJzp3YXZ5X2Rhc2g6JywgJzpwYXJ0X2FsdGVybmF0aW9uX21hcms6JywgJzp0cmlkZW50OicsICc6YmxhY2tfc3F1YXJlOicsXG4nOndoaXRlX3NxdWFyZTonLCAnOndoaXRlX2NoZWNrX21hcms6JywgJzpibGFja19zcXVhcmVfYnV0dG9uOicsXG4nOndoaXRlX3NxdWFyZV9idXR0b246JywgJzpibGFja19jaXJjbGU6JywgJzp3aGl0ZV9jaXJjbGU6Jyxcbic6cmVkX2NpcmNsZTonLCAnOmxhcmdlX2JsdWVfY2lyY2xlOicsICc6bGFyZ2VfYmx1ZV9kaWFtb25kOicsXG4nOmxhcmdlX29yYW5nZV9kaWFtb25kOicsICc6c21hbGxfYmx1ZV9kaWFtb25kOicsXG4nOnNtYWxsX29yYW5nZV9kaWFtb25kOicsICc6c21hbGxfcmVkX3RyaWFuZ2xlOicsXG4nOnNtYWxsX3JlZF90cmlhbmdsZV9kb3duOicsICc6c2hpcGl0OiddO1xuIiwibW9kdWxlLmV4cG9ydHM9e1xuICBcIm5hbWVcIjogXCJvY2YtZW1vamlcIixcbiAgXCJ2ZXJzaW9uXCI6IFwiMC4wLjFcIixcbiAgXCJtYWluXCI6IFwiLi9wbHVnaW4uanNcIixcbiAgXCJvcGVuLWNoYXQtZnJhbWV3b3JrXCI6IHtcbiAgICBcIm5hbWVzcGFjZVwiOiBcImVtb2ppXCJcbiAgfSxcbiAgXCJkZXZEZXBlbmRlbmNpZXNcIjoge1xuICAgIFwiY2hhaVwiOiBcIl4zLjUuMFwiLFxuICAgIFwibW9jaGFcIjogXCJeMy4zLjBcIlxuICB9XG59XG4iLCJsZXQgZW1vamlzID0gcmVxdWlyZSgnLi9lbW9qaS5qcycpO1xuXG4vLyB0aGlzIGlzIGFuIGV4YW1wbGUgb2YgbWlkZGxld2FyZSB1c2VkIGluIG91ciB0ZXN0LmpzXG4vLyBhZGRzIHNvbWUgdGV4dCB0byBtZXNzYWdlIGJlZm9yZSBpdCdzIHNlbnQgYW5kIHdoZW4gaXQncyByZWNlaXZlZFxubW9kdWxlLmV4cG9ydHMgPSAoY29uZmlnKSA9PiB7XG5cbiAgICAvLyByZWd1bGFyIGV4cHJlc3Npb24gdG8gZmluZCBlbW9qaSBzdHJpbmdzXG4gICAgY29uc3QgdGVzdCA9IC86W2EtejAtOV9cXC1cXCtdKzovZztcblxuICAgIC8vIGNyZWF0ZSBlbXB0eSBjb25maWcgb2JqZWN0IGlmIG5vdCBzdXBwbGllZFxuICAgIGNvbmZpZyA9IGNvbmZpZyB8fCB7fTtcblxuICAgIGNvbmZpZy5oZWlnaHQgPSBjb25maWcuaGVpZ2h0IHx8IDE2O1xuXG4gICAgLy8gd2hlcmUgZW1vamkgaW1hZ2VzIGFyZSBob3N0ZWQuIGZpbGVuYW1lIChleDogL3NtaWxlLnBuZykgd2lsbCBiZSBhZGRlZFxuICAgIGNvbmZpZy51cmwgPSBjb25maWcudXJsIHx8ICdodHRwOi8vd3d3LndlYnBhZ2VmeC5jb20vdG9vbHMvZW1vamktY2hlYXQtc2hlZXQvZ3JhcGhpY3MvZW1vamlzJztcblxuICAgIC8vIGZ1bmN0aW9uIHRvIHBhcnNlIHN0cmluZyBmb3IgOnNtaWxlOiBhbmQgb3RoZXIgZW1vamlcbiAgICBjb25zdCBlbW9qaSA9IChzb21lU3RyaW5nLCB1cmwgPSBjb25maWcudXJsLCBoZWlnaHQgPSBjb25maWcuaGVpZ2h0KSA9PiBzb21lU3RyaW5nLnJlcGxhY2UodGVzdCwgKG1hdGNoKSA9PiB7XG5cbiAgICAgICAgLy8gdXNlIHJlZ2V4IHRvIGZpbmQgZW1vamkgYW5kIHJlcGxhY2Ugd2l0aCBodG1sXG4gICAgICAgIGxldCByZXN1bHQgPSBtYXRjaDtcblxuICAgICAgICAvLyBpZiB0ZXh0IHN0cmluZyBpcyBpbiBsaXN0IG9mIGVtb2ppc1xuICAgICAgICBpZiAoZW1vamlzLmluZGV4T2YobWF0Y2gpICE9PSAtMSkge1xuXG4gICAgICAgICAgICAvLyByZW1vdmUgdGhlIDogYmVmb3JlIGFuZCBhZnRlclxuICAgICAgICAgICAgbGV0IG5hbWUgPSBTdHJpbmcobWF0Y2gpLnNsaWNlKDEsIC0xKTtcblxuICAgICAgICAgICAgLy8gcmV0dXJuIGh0bWwgaW1hZ2UsIHVzaW5nIHVybCBhbmQgaGVpZ2h0IHN1cHBsaWVkIGluXG4gICAgICAgICAgICAvLyBmdW5jdGlvblxuICAgICAgICAgICAgcmVzdWx0ID0gJzxpbWcgY2xhc3M9XCJlbW9qaVwiIHRpdGxlPVwiOicgKyBuYW1lXG4gICAgICAgICAgICAgICAgKyAnOlwiIGFsdD1cIicgKyBuYW1lICsgJ1wiIHNyYz1cIicgKyB1cmwgKyAnLydcbiAgICAgICAgICAgICAgICArIGVuY29kZVVSSUNvbXBvbmVudChuYW1lKSArICcucG5nXCInXG4gICAgICAgICAgICAgICAgKyAoaGVpZ2h0ID8gKCcgaGVpZ2h0PVwiJyArIGhlaWdodCArICdcIicpIDogJycpXG4gICAgICAgICAgICAgICAgKyAnIC8+JztcblxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcblxuICAgIH0pO1xuXG4gICAgbGV0IHBhcnNlRW1vamkgPSBmdW5jdGlvbihwYXlsb2FkLCBuZXh0KSB7XG4gICAgICAgIFxuICAgICAgICBpZihwYXlsb2FkLmRhdGEudGV4dCkge1xuICAgICAgICAgICAgLy8gcGFyc2UgZW1vamlcbiAgICAgICAgICAgIHBheWxvYWQuZGF0YS50ZXh0ID0gZW1vamkocGF5bG9hZC5kYXRhLnRleHQsIGNvbmZpZy51cmwsIGNvbmZpZy5oZWlnaHQpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gY29udGludWUgYWxvbmcgbWlkZGxld2FyZVxuICAgICAgICBuZXh0KG51bGwsIHBheWxvYWQpO1xuXG4gICAgfTtcblxuICAgIC8vIGRlZmluZSBtaWRkbGV3YXJlIHRvIHJ1biBhZnRlciBhIG1lc3NhZ2UgaGFzIGJlZW4gcmVjZWl2ZWQgYW5kIE9DRiBoYXMgcHJvY2Vzc2VkIGl0XG4gICAgbGV0IGJyb2FkY2FzdCA9IHtcbiAgICAgICAgJ21lc3NhZ2UnOiBwYXJzZUVtb2ppLFxuICAgICAgICAnJGhpc3RvcnkubWVzc2FnZSc6IHBhcnNlRW1vamlcbiAgICB9O1xuXG4gICAgLy8gdGhlc2UgYXJlIG5ldyBtZXRob2RzIHRoYXQgd2lsbCBiZSBhZGRlZCB0byB0aGUgZXh0ZW5kZWQgY2xhc3NcbiAgICBjbGFzcyBleHRlbnNpb24ge1xuICAgICAgICByZW5kZXIoc3RyaW5nLCB1cmwsIGhlaWdodCkge1xuICAgICAgICAgICAgcmV0dXJuIGVtb2ppKHN0cmluZywgdXJsLCBoZWlnaHQpO1xuICAgICAgICB9XG4gICAgICAgIHNlYXJjaChxdWVyeSkge1xuXG4gICAgICAgICAgICB2YXIgcmVzdWx0cyA9IFtdO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBmb3IodmFyIGkgaW4gZW1vamlzKSB7XG4gICAgICAgICAgICAgICAgaWYoZW1vamlzW2ldLnN1YnN0cmluZygwLCBxdWVyeS5sZW5ndGgpID09IHF1ZXJ5KSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdHMucHVzaChlbW9qaXNbaV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdHM7XG5cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIG1pZGRsZXdhcmUgdGVsbHMgdGhlIGZyYW1ld29yayB0byB1c2UgdGhlc2UgZnVuY3Rpb25zIHdoZW4gXG4gICAgLy8gbWVzc2FnZXMgYXJlIHNlbnQgb3IgcmVjZWl2ZWRcbiAgICByZXR1cm4ge1xuICAgICAgICBuYW1lc3BhY2UsXG4gICAgICAgIG1pZGRsZXdhcmU6IHtcbiAgICAgICAgICAgIGJyb2FkY2FzdDogYnJvYWRjYXN0XG4gICAgICAgIH0sXG4gICAgICAgIGV4dGVuZHM6IHtcbiAgICAgICAgICAgIENoYXQ6IGV4dGVuc2lvbixcbiAgICAgICAgICAgIEdsb2JhbENoYXQ6IGV4dGVuc2lvblxuICAgICAgICB9XG4gICAgfVxufVxuIl19
