(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(function() {

    const package = require('../package.json');
    window.ChatEngineCore.plugin[package.name] = require('../src/plugin.js');

})();

},{"../package.json":3,"../src/plugin.js":5}],2:[function(require,module,exports){
//
// Dotty makes it easy to programmatically access arbitrarily nested objects and
// their properties.
//

//
// `object` is an object, `path` is the path to the property you want to check
// for existence of.
//
// `path` can be provided as either a `"string.separated.with.dots"` or as
// `["an", "array"]`.
//
// Returns `true` if the path can be completely resolved, `false` otherwise.
//

var exists = module.exports.exists = function exists(object, path) {
  if (typeof path === "string") {
    path = path.split(".");
  }

  if (!(path instanceof Array) || path.length === 0) {
    return false;
  }

  path = path.slice();

  var key = path.shift();

  if (typeof object !== "object" || object === null) {
    return false;
  }

  if (path.length === 0) {
    return Object.hasOwnProperty.apply(object, [key]);
  } else {
    return exists(object[key], path);
  }
};

//
// These arguments are the same as those for `exists`.
//
// The return value, however, is the property you're trying to access, or
// `undefined` if it can't be found. This means you won't be able to tell
// the difference between an unresolved path and an undefined property, so you 
// should not use `get` to check for the existence of a property. Use `exists`
// instead.
//

var get = module.exports.get = function get(object, path) {
  if (typeof path === "string") {
    path = path.split(".");
  }

  if (!(path instanceof Array) || path.length === 0) {
    return;
  }

  path = path.slice();

  var key = path.shift();

  if (typeof object !== "object" || object === null) {
    return;
  }

  if (path.length === 0) {
    return object[key];
  }

  if (path.length) {
    return get(object[key], path);
  }
};

//
// Arguments are similar to `exists` and `get`, with the exception that path
// components are regexes with some special cases. If a path component is `"*"`
// on its own, it'll be converted to `/.*/`.
//
// The return value is an array of values where the key path matches the
// specified criterion. If none match, an empty array will be returned.
//

var search = module.exports.search = function search(object, path) {
  if (typeof path === "string") {
    path = path.split(".");
  }

  if (!(path instanceof Array) || path.length === 0) {
    return;
  }

  path = path.slice();

  var key = path.shift();

  if (typeof object !== "object" || object === null) {
    return;
  }

  if (key === "*") {
    key = ".*";
  }

  if (typeof key === "string") {
    key = new RegExp(key);
  }

  if (path.length === 0) {
    return Object.keys(object).filter(key.test.bind(key)).map(function(k) { return object[k]; });
  } else {
    return Array.prototype.concat.apply([], Object.keys(object).filter(key.test.bind(key)).map(function(k) { return search(object[k], path); }));
  }
};

//
// The first two arguments for `put` are the same as `exists` and `get`.
//
// The third argument is a value to `put` at the `path` of the `object`.
// Objects in the middle will be created if they don't exist, or added to if
// they do. If a value is encountered in the middle of the path that is *not*
// an object, it will not be overwritten.
//
// The return value is `true` in the case that the value was `put`
// successfully, or `false` otherwise.
//

var put = module.exports.put = function put(object, path, value) {
  if (typeof path === "string") {
    path = path.split(".");
  }

  if (!(path instanceof Array) || path.length === 0) {
    return false;
  }
  
  path = path.slice();

  var key = path.shift();

  if (typeof object !== "object" || object === null) {
    return false;
  }

  if (path.length === 0) {
    object[key] = value;
  } else {
    if (typeof object[key] === "undefined") {
      object[key] = {};
    }

    if (typeof object[key] !== "object" || object[key] === null) {
      return false;
    }

    return put(object[key], path, value);
  }
};

//
// `remove` is like `put` in reverse!
//
// The return value is `true` in the case that the value existed and was removed
// successfully, or `false` otherwise.
//

var remove = module.exports.remove = function remove(object, path, value) {
  if (typeof path === "string") {
    path = path.split(".");
  }

  if (!(path instanceof Array) || path.length === 0) {
    return false;
  }
  
  path = path.slice();

  var key = path.shift();

  if (typeof object !== "object" || object === null) {
    return false;
  }

  if (path.length === 0) {
    if (!Object.hasOwnProperty.call(object, key)) {
      return false;
    }

    delete object[key];

    return true;
  } else {
    return remove(object[key], path, value);
  }
};

//
// `deepKeys` creates a list of all possible key paths for a given object.
//
// The return value is always an array, the members of which are paths in array
// format. If you want them in dot-notation format, do something like this:
//
// ```js
// dotty.deepKeys(obj).map(function(e) {
//   return e.join(".");
// });
// ```
//
// *Note: this will probably explode on recursive objects. Be careful.*
//

var deepKeys = module.exports.deepKeys = function deepKeys(object, prefix) {
  if (typeof prefix === "undefined") {
    prefix = [];
  }

  var keys = [];

  for (var k in object) {
    if (!Object.hasOwnProperty.call(object, k)) {
      continue;
    }

    keys.push(prefix.concat([k]));

    if (typeof object[k] === "object" && object[k] !== null) {
      keys = keys.concat(deepKeys(object[k], prefix.concat([k])));
    }
  }

  return keys;
};

},{}],3:[function(require,module,exports){
module.exports={
  "author": "Ian Jennings",
  "name": "chat-engine-emoji",
  "version": "0.0.8",
  "main": "src/plugin.js",
  "dependencies": {
    "chat-engine": "^0.9.21",
    "dotty": "0.0.2"
  },
  "devDependencies": {
    "chai": "^3.5.0",
    "mocha": "^6.0.2"
  }
}

},{}],4:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){
/**
* @overview Emojis are an essential aspect of today's chat conversations and applications. With the ChatEngine Emoji plugin, you can enable the ability for your users to use emojis in their conversations.
* @module chat-engine-emoji
* @description  Parses emoji in ```payload.data.text```.
*/

const emojis = require('./emoji.js');
const dotty = require("dotty");

// this is an example of middleware used in our test.js
// adds some text to message before it's sent and when it's received

/**
* @function
* @ceplugin
* @requires {@link ChatEngine}
* @param {Object} config The config object
* @param {String} [prop="data.text"] The payload to search for.
* @param {String} [event="message"] The ChatEngine event that will trigger emoji parsing.
* @param {Function} config.title The title of the desktop notification
* @param {Integer} [height=16] The height of the resulting emojiß images
* @param {String} [url] The web directory where emoji images are hosted. Filename (ex: /smile.png) will be added.
* @example
*
*
* const emoji = require('./src/plugin.js');
* chat = new OCF.Chat('emoji-chat');
* chat.plugin(emoji());
* chat.on('message', (payload) => {
*     // payload.data.text == '<img class="emoji" title=":pizza:" alt="pizza" src="http://www.webpagefx.com/tools/emoji-cheat-sheet/graphics/emojis/pizza.png" height="16" />';
* });
*
* chat.emit('message', {
*     text: 'I want :pizza:'
* });
*/
module.exports = (config = {}) => {

    // regular expression to find emoji strings
    const test = /:[a-z0-9_\-\+]+:/g;

    config.event = config.event || 'message';

    // where in the payload the text is
    config.prop = config.prop || 'data.text';

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

    /**
    * Turns```:smile:``` into ```<img src="/smile.png" />```
    * @listens message
    * @listens $history.message
    * @ceextends Chat
    */
    let parseEmoji = function(payload, next) {

        let message = dotty.get(payload, config.prop);

        // check if this sub property exists
        if(message.length) {

            // parse emoji
            let newPayload = emoji(message, config.url, config.height);
            dotty.put(payload, config.prop, newPayload);

        }

        // continue along middleware
        next(null, payload);

    };

    // these are new methods that will be added to the extended class
    class extension {

        /**
         * Renders emoji given ```:smile:``` as input.
         * @method render
         * @ceextends Chat
         * @param  {String} string The emoji text to turn into an icon
         * @param  {String} url Root url to look for emoji images
         * @param  {Int} height Height of the emoji icons
         * @returns {String} Returns the IMG HTML for this emoji
         */
        render(string, url, height) {
            return emoji(string, url, height);
        }

        /**
         * Finds partial string matches of emoji text by searching emoji db.
         * @method search
         * @ceextends Chat
         * @param  {Strings} query The partial text to search for
         * @returns {Array} An array of matching emoji strings. Call the render function to display these.
         */
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

    let result = {
        namespace: 'emoji',
        middleware: {
            on: {}
        },
        extends: {
            Chat: extension
        }
    }

    result.middleware.on[config.event] = parseEmoji;
    result.middleware.on['$history.' + config.event] = parseEmoji;

    // middleware tells the framework to use these functions when
    // messages are sent or received
    return result;
}

},{"./emoji.js":4,"dotty":2}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Vzci9sb2NhbC9saWIvbm9kZV9tb2R1bGVzL2NoYXQtZW5naW5lLXBsdWdpbi9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiLnRtcC93cmFwLmpzIiwibm9kZV9tb2R1bGVzL2RvdHR5L2xpYi9pbmRleC5qcyIsInBhY2thZ2UuanNvbiIsInNyYy9lbW9qaS5qcyIsInNyYy9wbHVnaW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDek9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIihmdW5jdGlvbigpIHtcblxuICAgIGNvbnN0IHBhY2thZ2UgPSByZXF1aXJlKCcuLi9wYWNrYWdlLmpzb24nKTtcbiAgICB3aW5kb3cuQ2hhdEVuZ2luZUNvcmUucGx1Z2luW3BhY2thZ2UubmFtZV0gPSByZXF1aXJlKCcuLi9zcmMvcGx1Z2luLmpzJyk7XG5cbn0pKCk7XG4iLCIvL1xuLy8gRG90dHkgbWFrZXMgaXQgZWFzeSB0byBwcm9ncmFtbWF0aWNhbGx5IGFjY2VzcyBhcmJpdHJhcmlseSBuZXN0ZWQgb2JqZWN0cyBhbmRcbi8vIHRoZWlyIHByb3BlcnRpZXMuXG4vL1xuXG4vL1xuLy8gYG9iamVjdGAgaXMgYW4gb2JqZWN0LCBgcGF0aGAgaXMgdGhlIHBhdGggdG8gdGhlIHByb3BlcnR5IHlvdSB3YW50IHRvIGNoZWNrXG4vLyBmb3IgZXhpc3RlbmNlIG9mLlxuLy9cbi8vIGBwYXRoYCBjYW4gYmUgcHJvdmlkZWQgYXMgZWl0aGVyIGEgYFwic3RyaW5nLnNlcGFyYXRlZC53aXRoLmRvdHNcImAgb3IgYXNcbi8vIGBbXCJhblwiLCBcImFycmF5XCJdYC5cbi8vXG4vLyBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgcGF0aCBjYW4gYmUgY29tcGxldGVseSByZXNvbHZlZCwgYGZhbHNlYCBvdGhlcndpc2UuXG4vL1xuXG52YXIgZXhpc3RzID0gbW9kdWxlLmV4cG9ydHMuZXhpc3RzID0gZnVuY3Rpb24gZXhpc3RzKG9iamVjdCwgcGF0aCkge1xuICBpZiAodHlwZW9mIHBhdGggPT09IFwic3RyaW5nXCIpIHtcbiAgICBwYXRoID0gcGF0aC5zcGxpdChcIi5cIik7XG4gIH1cblxuICBpZiAoIShwYXRoIGluc3RhbmNlb2YgQXJyYXkpIHx8IHBhdGgubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcGF0aCA9IHBhdGguc2xpY2UoKTtcblxuICB2YXIga2V5ID0gcGF0aC5zaGlmdCgpO1xuXG4gIGlmICh0eXBlb2Ygb2JqZWN0ICE9PSBcIm9iamVjdFwiIHx8IG9iamVjdCA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlmIChwYXRoLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBPYmplY3QuaGFzT3duUHJvcGVydHkuYXBwbHkob2JqZWN0LCBba2V5XSk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGV4aXN0cyhvYmplY3Rba2V5XSwgcGF0aCk7XG4gIH1cbn07XG5cbi8vXG4vLyBUaGVzZSBhcmd1bWVudHMgYXJlIHRoZSBzYW1lIGFzIHRob3NlIGZvciBgZXhpc3RzYC5cbi8vXG4vLyBUaGUgcmV0dXJuIHZhbHVlLCBob3dldmVyLCBpcyB0aGUgcHJvcGVydHkgeW91J3JlIHRyeWluZyB0byBhY2Nlc3MsIG9yXG4vLyBgdW5kZWZpbmVkYCBpZiBpdCBjYW4ndCBiZSBmb3VuZC4gVGhpcyBtZWFucyB5b3Ugd29uJ3QgYmUgYWJsZSB0byB0ZWxsXG4vLyB0aGUgZGlmZmVyZW5jZSBiZXR3ZWVuIGFuIHVucmVzb2x2ZWQgcGF0aCBhbmQgYW4gdW5kZWZpbmVkIHByb3BlcnR5LCBzbyB5b3UgXG4vLyBzaG91bGQgbm90IHVzZSBgZ2V0YCB0byBjaGVjayBmb3IgdGhlIGV4aXN0ZW5jZSBvZiBhIHByb3BlcnR5LiBVc2UgYGV4aXN0c2Bcbi8vIGluc3RlYWQuXG4vL1xuXG52YXIgZ2V0ID0gbW9kdWxlLmV4cG9ydHMuZ2V0ID0gZnVuY3Rpb24gZ2V0KG9iamVjdCwgcGF0aCkge1xuICBpZiAodHlwZW9mIHBhdGggPT09IFwic3RyaW5nXCIpIHtcbiAgICBwYXRoID0gcGF0aC5zcGxpdChcIi5cIik7XG4gIH1cblxuICBpZiAoIShwYXRoIGluc3RhbmNlb2YgQXJyYXkpIHx8IHBhdGgubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgcGF0aCA9IHBhdGguc2xpY2UoKTtcblxuICB2YXIga2V5ID0gcGF0aC5zaGlmdCgpO1xuXG4gIGlmICh0eXBlb2Ygb2JqZWN0ICE9PSBcIm9iamVjdFwiIHx8IG9iamVjdCA9PT0gbnVsbCkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmIChwYXRoLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBvYmplY3Rba2V5XTtcbiAgfVxuXG4gIGlmIChwYXRoLmxlbmd0aCkge1xuICAgIHJldHVybiBnZXQob2JqZWN0W2tleV0sIHBhdGgpO1xuICB9XG59O1xuXG4vL1xuLy8gQXJndW1lbnRzIGFyZSBzaW1pbGFyIHRvIGBleGlzdHNgIGFuZCBgZ2V0YCwgd2l0aCB0aGUgZXhjZXB0aW9uIHRoYXQgcGF0aFxuLy8gY29tcG9uZW50cyBhcmUgcmVnZXhlcyB3aXRoIHNvbWUgc3BlY2lhbCBjYXNlcy4gSWYgYSBwYXRoIGNvbXBvbmVudCBpcyBgXCIqXCJgXG4vLyBvbiBpdHMgb3duLCBpdCdsbCBiZSBjb252ZXJ0ZWQgdG8gYC8uKi9gLlxuLy9cbi8vIFRoZSByZXR1cm4gdmFsdWUgaXMgYW4gYXJyYXkgb2YgdmFsdWVzIHdoZXJlIHRoZSBrZXkgcGF0aCBtYXRjaGVzIHRoZVxuLy8gc3BlY2lmaWVkIGNyaXRlcmlvbi4gSWYgbm9uZSBtYXRjaCwgYW4gZW1wdHkgYXJyYXkgd2lsbCBiZSByZXR1cm5lZC5cbi8vXG5cbnZhciBzZWFyY2ggPSBtb2R1bGUuZXhwb3J0cy5zZWFyY2ggPSBmdW5jdGlvbiBzZWFyY2gob2JqZWN0LCBwYXRoKSB7XG4gIGlmICh0eXBlb2YgcGF0aCA9PT0gXCJzdHJpbmdcIikge1xuICAgIHBhdGggPSBwYXRoLnNwbGl0KFwiLlwiKTtcbiAgfVxuXG4gIGlmICghKHBhdGggaW5zdGFuY2VvZiBBcnJheSkgfHwgcGF0aC5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBwYXRoID0gcGF0aC5zbGljZSgpO1xuXG4gIHZhciBrZXkgPSBwYXRoLnNoaWZ0KCk7XG5cbiAgaWYgKHR5cGVvZiBvYmplY3QgIT09IFwib2JqZWN0XCIgfHwgb2JqZWN0ID09PSBudWxsKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaWYgKGtleSA9PT0gXCIqXCIpIHtcbiAgICBrZXkgPSBcIi4qXCI7XG4gIH1cblxuICBpZiAodHlwZW9mIGtleSA9PT0gXCJzdHJpbmdcIikge1xuICAgIGtleSA9IG5ldyBSZWdFeHAoa2V5KTtcbiAgfVxuXG4gIGlmIChwYXRoLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBPYmplY3Qua2V5cyhvYmplY3QpLmZpbHRlcihrZXkudGVzdC5iaW5kKGtleSkpLm1hcChmdW5jdGlvbihrKSB7IHJldHVybiBvYmplY3Rba107IH0pO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBBcnJheS5wcm90b3R5cGUuY29uY2F0LmFwcGx5KFtdLCBPYmplY3Qua2V5cyhvYmplY3QpLmZpbHRlcihrZXkudGVzdC5iaW5kKGtleSkpLm1hcChmdW5jdGlvbihrKSB7IHJldHVybiBzZWFyY2gob2JqZWN0W2tdLCBwYXRoKTsgfSkpO1xuICB9XG59O1xuXG4vL1xuLy8gVGhlIGZpcnN0IHR3byBhcmd1bWVudHMgZm9yIGBwdXRgIGFyZSB0aGUgc2FtZSBhcyBgZXhpc3RzYCBhbmQgYGdldGAuXG4vL1xuLy8gVGhlIHRoaXJkIGFyZ3VtZW50IGlzIGEgdmFsdWUgdG8gYHB1dGAgYXQgdGhlIGBwYXRoYCBvZiB0aGUgYG9iamVjdGAuXG4vLyBPYmplY3RzIGluIHRoZSBtaWRkbGUgd2lsbCBiZSBjcmVhdGVkIGlmIHRoZXkgZG9uJ3QgZXhpc3QsIG9yIGFkZGVkIHRvIGlmXG4vLyB0aGV5IGRvLiBJZiBhIHZhbHVlIGlzIGVuY291bnRlcmVkIGluIHRoZSBtaWRkbGUgb2YgdGhlIHBhdGggdGhhdCBpcyAqbm90KlxuLy8gYW4gb2JqZWN0LCBpdCB3aWxsIG5vdCBiZSBvdmVyd3JpdHRlbi5cbi8vXG4vLyBUaGUgcmV0dXJuIHZhbHVlIGlzIGB0cnVlYCBpbiB0aGUgY2FzZSB0aGF0IHRoZSB2YWx1ZSB3YXMgYHB1dGBcbi8vIHN1Y2Nlc3NmdWxseSwgb3IgYGZhbHNlYCBvdGhlcndpc2UuXG4vL1xuXG52YXIgcHV0ID0gbW9kdWxlLmV4cG9ydHMucHV0ID0gZnVuY3Rpb24gcHV0KG9iamVjdCwgcGF0aCwgdmFsdWUpIHtcbiAgaWYgKHR5cGVvZiBwYXRoID09PSBcInN0cmluZ1wiKSB7XG4gICAgcGF0aCA9IHBhdGguc3BsaXQoXCIuXCIpO1xuICB9XG5cbiAgaWYgKCEocGF0aCBpbnN0YW5jZW9mIEFycmF5KSB8fCBwYXRoLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBcbiAgcGF0aCA9IHBhdGguc2xpY2UoKTtcblxuICB2YXIga2V5ID0gcGF0aC5zaGlmdCgpO1xuXG4gIGlmICh0eXBlb2Ygb2JqZWN0ICE9PSBcIm9iamVjdFwiIHx8IG9iamVjdCA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlmIChwYXRoLmxlbmd0aCA9PT0gMCkge1xuICAgIG9iamVjdFtrZXldID0gdmFsdWU7XG4gIH0gZWxzZSB7XG4gICAgaWYgKHR5cGVvZiBvYmplY3Rba2V5XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgb2JqZWN0W2tleV0gPSB7fTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIG9iamVjdFtrZXldICE9PSBcIm9iamVjdFwiIHx8IG9iamVjdFtrZXldID09PSBudWxsKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIHB1dChvYmplY3Rba2V5XSwgcGF0aCwgdmFsdWUpO1xuICB9XG59O1xuXG4vL1xuLy8gYHJlbW92ZWAgaXMgbGlrZSBgcHV0YCBpbiByZXZlcnNlIVxuLy9cbi8vIFRoZSByZXR1cm4gdmFsdWUgaXMgYHRydWVgIGluIHRoZSBjYXNlIHRoYXQgdGhlIHZhbHVlIGV4aXN0ZWQgYW5kIHdhcyByZW1vdmVkXG4vLyBzdWNjZXNzZnVsbHksIG9yIGBmYWxzZWAgb3RoZXJ3aXNlLlxuLy9cblxudmFyIHJlbW92ZSA9IG1vZHVsZS5leHBvcnRzLnJlbW92ZSA9IGZ1bmN0aW9uIHJlbW92ZShvYmplY3QsIHBhdGgsIHZhbHVlKSB7XG4gIGlmICh0eXBlb2YgcGF0aCA9PT0gXCJzdHJpbmdcIikge1xuICAgIHBhdGggPSBwYXRoLnNwbGl0KFwiLlwiKTtcbiAgfVxuXG4gIGlmICghKHBhdGggaW5zdGFuY2VvZiBBcnJheSkgfHwgcGF0aC5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgXG4gIHBhdGggPSBwYXRoLnNsaWNlKCk7XG5cbiAgdmFyIGtleSA9IHBhdGguc2hpZnQoKTtcblxuICBpZiAodHlwZW9mIG9iamVjdCAhPT0gXCJvYmplY3RcIiB8fCBvYmplY3QgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpZiAocGF0aC5sZW5ndGggPT09IDApIHtcbiAgICBpZiAoIU9iamVjdC5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwga2V5KSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGRlbGV0ZSBvYmplY3Rba2V5XTtcblxuICAgIHJldHVybiB0cnVlO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiByZW1vdmUob2JqZWN0W2tleV0sIHBhdGgsIHZhbHVlKTtcbiAgfVxufTtcblxuLy9cbi8vIGBkZWVwS2V5c2AgY3JlYXRlcyBhIGxpc3Qgb2YgYWxsIHBvc3NpYmxlIGtleSBwYXRocyBmb3IgYSBnaXZlbiBvYmplY3QuXG4vL1xuLy8gVGhlIHJldHVybiB2YWx1ZSBpcyBhbHdheXMgYW4gYXJyYXksIHRoZSBtZW1iZXJzIG9mIHdoaWNoIGFyZSBwYXRocyBpbiBhcnJheVxuLy8gZm9ybWF0LiBJZiB5b3Ugd2FudCB0aGVtIGluIGRvdC1ub3RhdGlvbiBmb3JtYXQsIGRvIHNvbWV0aGluZyBsaWtlIHRoaXM6XG4vL1xuLy8gYGBganNcbi8vIGRvdHR5LmRlZXBLZXlzKG9iaikubWFwKGZ1bmN0aW9uKGUpIHtcbi8vICAgcmV0dXJuIGUuam9pbihcIi5cIik7XG4vLyB9KTtcbi8vIGBgYFxuLy9cbi8vICpOb3RlOiB0aGlzIHdpbGwgcHJvYmFibHkgZXhwbG9kZSBvbiByZWN1cnNpdmUgb2JqZWN0cy4gQmUgY2FyZWZ1bC4qXG4vL1xuXG52YXIgZGVlcEtleXMgPSBtb2R1bGUuZXhwb3J0cy5kZWVwS2V5cyA9IGZ1bmN0aW9uIGRlZXBLZXlzKG9iamVjdCwgcHJlZml4KSB7XG4gIGlmICh0eXBlb2YgcHJlZml4ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgcHJlZml4ID0gW107XG4gIH1cblxuICB2YXIga2V5cyA9IFtdO1xuXG4gIGZvciAodmFyIGsgaW4gb2JqZWN0KSB7XG4gICAgaWYgKCFPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIGspKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICBrZXlzLnB1c2gocHJlZml4LmNvbmNhdChba10pKTtcblxuICAgIGlmICh0eXBlb2Ygb2JqZWN0W2tdID09PSBcIm9iamVjdFwiICYmIG9iamVjdFtrXSAhPT0gbnVsbCkge1xuICAgICAga2V5cyA9IGtleXMuY29uY2F0KGRlZXBLZXlzKG9iamVjdFtrXSwgcHJlZml4LmNvbmNhdChba10pKSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGtleXM7XG59O1xuIiwibW9kdWxlLmV4cG9ydHM9e1xuICBcImF1dGhvclwiOiBcIklhbiBKZW5uaW5nc1wiLFxuICBcIm5hbWVcIjogXCJjaGF0LWVuZ2luZS1lbW9qaVwiLFxuICBcInZlcnNpb25cIjogXCIwLjAuOFwiLFxuICBcIm1haW5cIjogXCJzcmMvcGx1Z2luLmpzXCIsXG4gIFwiZGVwZW5kZW5jaWVzXCI6IHtcbiAgICBcImNoYXQtZW5naW5lXCI6IFwiXjAuOS4yMVwiLFxuICAgIFwiZG90dHlcIjogXCIwLjAuMlwiXG4gIH0sXG4gIFwiZGV2RGVwZW5kZW5jaWVzXCI6IHtcbiAgICBcImNoYWlcIjogXCJeMy41LjBcIixcbiAgICBcIm1vY2hhXCI6IFwiXjYuMC4yXCJcbiAgfVxufVxuIiwiLy8gYWRhcHRlZCBmcm9tXG4vLyBodHRwczovL2dpdGh1Yi5jb20vSGVucmlrSm9yZXRlZy9lbW9qaS1pbWFnZXMvYmxvYi9tYXN0ZXIvZW1vamktaW1hZ2VzLmpzXG5cbi8vIGxpc3Qgb2YgZW1vamlpIHRleHQgdG8gcGFyc2Vcbm1vZHVsZS5leHBvcnRzID0gWyc6Ymx1c2g6JywgJzpzY3JlYW06JywgJzpzbWlyazonLCAnOnNtaWxleTonLFxuJzpzdHVja19vdXRfdG9uZ3VlX2Nsb3NlZF9leWVzOicsICc6c3R1Y2tfb3V0X3Rvbmd1ZV93aW5raW5nX2V5ZTonLFxuJzpyYWdlOicsICc6ZGlzYXBwb2ludGVkOicsICc6c29iOicsICc6a2lzc2luZ19oZWFydDonLCAnOndpbms6Jyxcbic6cGVuc2l2ZTonLCAnOmNvbmZvdW5kZWQ6JywgJzpmbHVzaGVkOicsICc6cmVsYXhlZDonLCAnOm1hc2s6Jyxcbic6aGVhcnQ6JywgJzpicm9rZW5faGVhcnQ6JywgJzpzdW5ueTonLCAnOnVtYnJlbGxhOicsICc6Y2xvdWQ6Jyxcbic6c25vd2ZsYWtlOicsICc6c25vd21hbjonLCAnOnphcDonLCAnOmN5Y2xvbmU6JywgJzpmb2dneTonLCAnOm9jZWFuOicsXG4nOmNhdDonLCAnOmRvZzonLCAnOm1vdXNlOicsICc6aGFtc3RlcjonLCAnOnJhYmJpdDonLCAnOndvbGY6JywgJzpmcm9nOicsXG4nOnRpZ2VyOicsICc6a29hbGE6JywgJzpiZWFyOicsICc6cGlnOicsICc6cGlnX25vc2U6JywgJzpjb3c6JywgJzpib2FyOicsXG4nOm1vbmtleV9mYWNlOicsICc6bW9ua2V5OicsICc6aG9yc2U6JywgJzpyYWNlaG9yc2U6JywgJzpjYW1lbDonLFxuJzpzaGVlcDonLCAnOmVsZXBoYW50OicsICc6cGFuZGFfZmFjZTonLCAnOnNuYWtlOicsICc6YmlyZDonLFxuJzpiYWJ5X2NoaWNrOicsICc6aGF0Y2hlZF9jaGljazonLCAnOmhhdGNoaW5nX2NoaWNrOicsICc6Y2hpY2tlbjonLFxuJzpwZW5ndWluOicsICc6dHVydGxlOicsICc6YnVnOicsICc6aG9uZXliZWU6JywgJzphbnQ6JywgJzpiZWV0bGU6Jyxcbic6c25haWw6JywgJzpvY3RvcHVzOicsICc6dHJvcGljYWxfZmlzaDonLCAnOmZpc2g6JywgJzp3aGFsZTonLFxuJzp3aGFsZTI6JywgJzpkb2xwaGluOicsICc6Y293MjonLCAnOnJhbTonLCAnOnJhdDonLCAnOndhdGVyX2J1ZmZhbG86Jyxcbic6dGlnZXIyOicsICc6cmFiYml0MjonLCAnOmRyYWdvbjonLCAnOmdvYXQ6JywgJzpyb29zdGVyOicsICc6ZG9nMjonLFxuJzpwaWcyOicsICc6bW91c2UyOicsICc6b3g6JywgJzpkcmFnb25fZmFjZTonLCAnOmJsb3dmaXNoOicsXG4nOmNyb2NvZGlsZTonLCAnOmRyb21lZGFyeV9jYW1lbDonLCAnOmxlb3BhcmQ6JywgJzpjYXQyOicsICc6cG9vZGxlOicsXG4nOnBhd19wcmludHM6JywgJzpib3VxdWV0OicsICc6Y2hlcnJ5X2Jsb3Nzb206JywgJzp0dWxpcDonLFxuJzpmb3VyX2xlYWZfY2xvdmVyOicsICc6cm9zZTonLCAnOnN1bmZsb3dlcjonLCAnOmhpYmlzY3VzOicsXG4nOm1hcGxlX2xlYWY6JywgJzpsZWF2ZXM6JywgJzpmYWxsZW5fbGVhZjonLCAnOmhlcmI6JywgJzptdXNocm9vbTonLFxuJzpjYWN0dXM6JywgJzpwYWxtX3RyZWU6JywgJzpldmVyZ3JlZW5fdHJlZTonLCAnOmRlY2lkdW91c190cmVlOicsXG4nOmNoZXN0bnV0OicsICc6c2VlZGxpbmc6JywgJzpibG9zc29tOicsICc6ZWFyX29mX3JpY2U6JywgJzpzaGVsbDonLFxuJzpnbG9iZV93aXRoX21lcmlkaWFuczonLCAnOnN1bl93aXRoX2ZhY2U6JywgJzpmdWxsX21vb25fd2l0aF9mYWNlOicsXG4nOm5ld19tb29uX3dpdGhfZmFjZTonLCAnOm5ld19tb29uOicsICc6d2F4aW5nX2NyZXNjZW50X21vb246Jyxcbic6Zmlyc3RfcXVhcnRlcl9tb29uOicsICc6d2F4aW5nX2dpYmJvdXNfbW9vbjonLCAnOmZ1bGxfbW9vbjonLFxuJzp3YW5pbmdfZ2liYm91c19tb29uOicsICc6bGFzdF9xdWFydGVyX21vb246JywgJzp3YW5pbmdfY3Jlc2NlbnRfbW9vbjonLFxuJzpsYXN0X3F1YXJ0ZXJfbW9vbl93aXRoX2ZhY2U6JywgJzpmaXJzdF9xdWFydGVyX21vb25fd2l0aF9mYWNlOicsXG4nOm1vb246JywgJzplYXJ0aF9hZnJpY2E6JywgJzplYXJ0aF9hbWVyaWNhczonLCAnOmVhcnRoX2FzaWE6Jyxcbic6dm9sY2FubzonLCAnOm1pbGt5X3dheTonLCAnOnBhcnRseV9zdW5ueTonLCAnOm9jdG9jYXQ6JywgJzpzcXVpcnJlbDonLFxuJzpiYW1ib286JywgJzpnaWZ0X2hlYXJ0OicsICc6ZG9sbHM6JywgJzpzY2hvb2xfc2F0Y2hlbDonLFxuJzptb3J0YXJfYm9hcmQ6JywgJzpmbGFnczonLCAnOmZpcmV3b3JrczonLCAnOnNwYXJrbGVyOicsICc6d2luZF9jaGltZTonLFxuJzpyaWNlX3NjZW5lOicsICc6amFja19vX2xhbnRlcm46JywgJzpnaG9zdDonLCAnOnNhbnRhOicsXG4nOmNocmlzdG1hc190cmVlOicsICc6Z2lmdDonLCAnOmJlbGw6JywgJzpub19iZWxsOicsICc6dGFuYWJhdGFfdHJlZTonLFxuJzp0YWRhOicsICc6Y29uZmV0dGlfYmFsbDonLCAnOmJhbGxvb246JywgJzpjcnlzdGFsX2JhbGw6JywgJzpjZDonLFxuJzpkdmQ6JywgJzpmbG9wcHlfZGlzazonLCAnOmNhbWVyYTonLCAnOnZpZGVvX2NhbWVyYTonLCAnOm1vdmllX2NhbWVyYTonLFxuJzpjb21wdXRlcjonLCAnOnR2OicsICc6aXBob25lOicsICc6cGhvbmU6JywgJzp0ZWxlcGhvbmU6Jyxcbic6dGVsZXBob25lX3JlY2VpdmVyOicsICc6cGFnZXI6JywgJzpmYXg6JywgJzptaW5pZGlzYzonLCAnOnZoczonLFxuJzpzb3VuZDonLCAnOnNwZWFrZXI6JywgJzptdXRlOicsICc6bG91ZHNwZWFrZXI6JywgJzptZWdhOicsXG4nOmhvdXJnbGFzczonLCAnOmhvdXJnbGFzc19mbG93aW5nX3NhbmQ6JywgJzphbGFybV9jbG9jazonLCAnOndhdGNoOicsXG4nOnJhZGlvOicsICc6c2F0ZWxsaXRlOicsICc6bG9vcDonLCAnOm1hZzonLCAnOm1hZ19yaWdodDonLCAnOnVubG9jazonLFxuJzpsb2NrOicsICc6bG9ja193aXRoX2lua19wZW46JywgJzpjbG9zZWRfbG9ja193aXRoX2tleTonLCAnOmtleTonLFxuJzpidWxiOicsICc6Zmxhc2hsaWdodDonLCAnOmhpZ2hfYnJpZ2h0bmVzczonLCAnOmxvd19icmlnaHRuZXNzOicsXG4nOmVsZWN0cmljX3BsdWc6JywgJzpiYXR0ZXJ5OicsICc6Y2FsbGluZzonLCAnOmVtYWlsOicsICc6bWFpbGJveDonLFxuJzpwb3N0Ym94OicsICc6YmF0aDonLCAnOmJhdGh0dWI6JywgJzpzaG93ZXI6JywgJzp0b2lsZXQ6JywgJzp3cmVuY2g6Jyxcbic6bnV0X2FuZF9ib2x0OicsICc6aGFtbWVyOicsICc6c2VhdDonLCAnOm1vbmV5YmFnOicsICc6eWVuOicsICc6ZG9sbGFyOicsXG4nOnBvdW5kOicsICc6ZXVybzonLCAnOmNyZWRpdF9jYXJkOicsICc6bW9uZXlfd2l0aF93aW5nczonLCAnOmUtbWFpbDonLFxuJzppbmJveF90cmF5OicsICc6b3V0Ym94X3RyYXk6JywgJzplbnZlbG9wZTonLCAnOmluY29taW5nX2VudmVsb3BlOicsXG4nOnBvc3RhbF9ob3JuOicsICc6bWFpbGJveF9jbG9zZWQ6JywgJzptYWlsYm94X3dpdGhfbWFpbDonLFxuJzptYWlsYm94X3dpdGhfbm9fbWFpbDonLCAnOmRvb3I6JywgJzpzbW9raW5nOicsICc6Ym9tYjonLCAnOmd1bjonLFxuJzpob2NobzonLCAnOnBpbGw6JywgJzpzeXJpbmdlOicsICc6cGFnZV9mYWNpbmdfdXA6JywgJzpwYWdlX3dpdGhfY3VybDonLFxuJzpib29rbWFya190YWJzOicsICc6YmFyX2NoYXJ0OicsICc6Y2hhcnRfd2l0aF91cHdhcmRzX3RyZW5kOicsXG4nOmNoYXJ0X3dpdGhfZG93bndhcmRzX3RyZW5kOicsICc6c2Nyb2xsOicsICc6Y2xpcGJvYXJkOicsICc6Y2FsZW5kYXI6Jyxcbic6ZGF0ZTonLCAnOmNhcmRfaW5kZXg6JywgJzpmaWxlX2ZvbGRlcjonLCAnOm9wZW5fZmlsZV9mb2xkZXI6Jyxcbic6c2Npc3NvcnM6JywgJzpwdXNocGluOicsICc6cGFwZXJjbGlwOicsICc6YmxhY2tfbmliOicsICc6cGVuY2lsMjonLFxuJzpzdHJhaWdodF9ydWxlcjonLCAnOnRyaWFuZ3VsYXJfcnVsZXI6JywgJzpjbG9zZWRfYm9vazonLCAnOmdyZWVuX2Jvb2s6Jyxcbic6Ymx1ZV9ib29rOicsICc6b3JhbmdlX2Jvb2s6JywgJzpub3RlYm9vazonLFxuJzpub3RlYm9va193aXRoX2RlY29yYXRpdmVfY292ZXI6JywgJzpsZWRnZXI6JywgJzpib29rczonLCAnOmJvb2ttYXJrOicsXG4nOm5hbWVfYmFkZ2U6JywgJzptaWNyb3Njb3BlOicsICc6dGVsZXNjb3BlOicsICc6bmV3c3BhcGVyOicsXG4nOmZvb3RiYWxsOicsICc6YmFza2V0YmFsbDonLCAnOnNvY2NlcjonLCAnOmJhc2ViYWxsOicsICc6dGVubmlzOicsXG4nOjhiYWxsOicsICc6cnVnYnlfZm9vdGJhbGw6JywgJzpib3dsaW5nOicsICc6Z29sZjonLFxuJzptb3VudGFpbl9iaWN5Y2xpc3Q6JywgJzpiaWN5Y2xpc3Q6JywgJzpob3JzZV9yYWNpbmc6JywgJzpzbm93Ym9hcmRlcjonLFxuJzpzd2ltbWVyOicsICc6c3VyZmVyOicsICc6c2tpOicsICc6c3BhZGVzOicsICc6aGVhcnRzOicsICc6Y2x1YnM6Jyxcbic6ZGlhbW9uZHM6JywgJzpnZW06JywgJzpyaW5nOicsICc6dHJvcGh5OicsICc6bXVzaWNhbF9zY29yZTonLFxuJzptdXNpY2FsX2tleWJvYXJkOicsICc6dmlvbGluOicsICc6c3BhY2VfaW52YWRlcjonLCAnOnZpZGVvX2dhbWU6Jyxcbic6YmxhY2tfam9rZXI6JywgJzpmbG93ZXJfcGxheWluZ19jYXJkczonLCAnOmdhbWVfZGllOicsICc6ZGFydDonLFxuJzptYWhqb25nOicsICc6Y2xhcHBlcjonLCAnOm1lbW86JywgJzpwZW5jaWw6JywgJzpib29rOicsICc6YXJ0OicsXG4nOm1pY3JvcGhvbmU6JywgJzpoZWFkcGhvbmVzOicsICc6dHJ1bXBldDonLCAnOnNheG9waG9uZTonLCAnOmd1aXRhcjonLFxuJzpzaG9lOicsICc6c2FuZGFsOicsICc6aGlnaF9oZWVsOicsICc6bGlwc3RpY2s6JywgJzpib290OicsICc6c2hpcnQ6Jyxcbic6dHNoaXJ0OicsICc6bmVja3RpZTonLCAnOndvbWFuc19jbG90aGVzOicsICc6ZHJlc3M6Jyxcbic6cnVubmluZ19zaGlydF93aXRoX3Nhc2g6JywgJzpqZWFuczonLCAnOmtpbW9ubzonLCAnOmJpa2luaTonLFxuJzpyaWJib246JywgJzp0b3BoYXQ6JywgJzpjcm93bjonLCAnOndvbWFuc19oYXQ6JywgJzptYW5zX3Nob2U6Jyxcbic6Y2xvc2VkX3VtYnJlbGxhOicsICc6YnJpZWZjYXNlOicsICc6aGFuZGJhZzonLCAnOnBvdWNoOicsICc6cHVyc2U6Jyxcbic6ZXllZ2xhc3NlczonLCAnOmZpc2hpbmdfcG9sZV9hbmRfZmlzaDonLCAnOmNvZmZlZTonLCAnOnRlYTonLCAnOnNha2U6Jyxcbic6YmFieV9ib3R0bGU6JywgJzpiZWVyOicsICc6YmVlcnM6JywgJzpjb2NrdGFpbDonLCAnOnRyb3BpY2FsX2RyaW5rOicsXG4nOndpbmVfZ2xhc3M6JywgJzpmb3JrX2FuZF9rbmlmZTonLCAnOnBpenphOicsICc6aGFtYnVyZ2VyOicsICc6ZnJpZXM6Jyxcbic6cG91bHRyeV9sZWc6JywgJzptZWF0X29uX2JvbmU6JywgJzpzcGFnaGV0dGk6JywgJzpjdXJyeTonLFxuJzpmcmllZF9zaHJpbXA6JywgJzpiZW50bzonLCAnOnN1c2hpOicsICc6ZmlzaF9jYWtlOicsICc6cmljZV9iYWxsOicsXG4nOnJpY2VfY3JhY2tlcjonLCAnOnJpY2U6JywgJzpyYW1lbjonLCAnOnN0ZXc6JywgJzpvZGVuOicsICc6ZGFuZ286Jyxcbic6ZWdnOicsICc6YnJlYWQ6JywgJzpkb3VnaG51dDonLCAnOmN1c3RhcmQ6JywgJzppY2VjcmVhbTonLFxuJzppY2VfY3JlYW06JywgJzpzaGF2ZWRfaWNlOicsICc6YmlydGhkYXk6JywgJzpjYWtlOicsICc6Y29va2llOicsXG4nOmNob2NvbGF0ZV9iYXI6JywgJzpjYW5keTonLCAnOmxvbGxpcG9wOicsICc6aG9uZXlfcG90OicsICc6YXBwbGU6Jyxcbic6Z3JlZW5fYXBwbGU6JywgJzp0YW5nZXJpbmU6JywgJzpsZW1vbjonLCAnOmNoZXJyaWVzOicsICc6Z3JhcGVzOicsXG4nOndhdGVybWVsb246JywgJzpzdHJhd2JlcnJ5OicsICc6cGVhY2g6JywgJzptZWxvbjonLCAnOmJhbmFuYTonLFxuJzpwZWFyOicsICc6cGluZWFwcGxlOicsICc6c3dlZXRfcG90YXRvOicsICc6ZWdncGxhbnQ6JywgJzp0b21hdG86Jyxcbic6Y29ybjonLCAnOmFsaWVuOicsICc6YW5nZWw6JywgJzphbmdlcjonLCAnOmFuZ3J5OicsICc6YW5ndWlzaGVkOicsXG4nOmFzdG9uaXNoZWQ6JywgJzpiYWJ5OicsICc6Ymx1ZV9oZWFydDonLCAnOmJsdXNoOicsICc6Ym9vbTonLCAnOmJvdzonLFxuJzpib3d0aWU6JywgJzpib3k6JywgJzpicmlkZV93aXRoX3ZlaWw6JywgJzpicm9rZW5faGVhcnQ6Jyxcbic6YnVzdF9pbl9zaWxob3VldHRlOicsICc6YnVzdHNfaW5fc2lsaG91ZXR0ZTonLCAnOmNsYXA6JywgJzpjb2xkX3N3ZWF0OicsXG4nOmNvbGxpc2lvbjonLCAnOmNvbmZvdW5kZWQ6JywgJzpjb25mdXNlZDonLCAnOmNvbnN0cnVjdGlvbl93b3JrZXI6Jyxcbic6Y29wOicsICc6Y291cGxlX3dpdGhfaGVhcnQ6JywgJzpjb3VwbGU6JywgJzpjb3VwbGVraXNzOicsICc6Y3J5OicsXG4nOmNyeWluZ19jYXRfZmFjZTonLCAnOmN1cGlkOicsICc6ZGFuY2VyOicsICc6ZGFuY2VyczonLCAnOmRhc2g6Jyxcbic6ZGlzYXBwb2ludGVkOicsICc6ZGl6enlfZmFjZTonLCAnOmRpenp5OicsICc6ZHJvcGxldDonLCAnOmVhcjonLFxuJzpleGNsYW1hdGlvbjonLCAnOmV4cHJlc3Npb25sZXNzOicsICc6ZXllczonLCAnOmZhY2VwdW5jaDonLCAnOmZhbWlseTonLFxuJzpmZWFyZnVsOicsICc6ZmVlbHNnb29kOicsICc6ZmVldDonLCAnOmZpbm5hZGllOicsICc6ZmlyZTonLCAnOmZpc3Q6Jyxcbic6Zmx1c2hlZDonLCAnOmZyb3duaW5nOicsICc6Z2lybDonLCAnOmdvYmVyc2VyazonLCAnOmdvZG1vZGU6Jyxcbic6Z3JlZW5faGVhcnQ6JywgJzpncmV5X2V4Y2xhbWF0aW9uOicsICc6Z3JleV9xdWVzdGlvbjonLCAnOmdyaW1hY2luZzonLFxuJzpncmluOicsICc6Z3Jpbm5pbmc6JywgJzpndWFyZHNtYW46JywgJzpoYWlyY3V0OicsICc6aGFuZDonLCAnOmhhbmtleTonLFxuJzpoZWFyX25vX2V2aWw6JywgJzpoZWFydF9leWVzX2NhdDonLCAnOmhlYXJ0X2V5ZXM6JywgJzpoZWFydDonLFxuJzpoZWFydGJlYXQ6JywgJzpoZWFydHB1bHNlOicsICc6aHVydHJlYWxiYWQ6JywgJzpodXNoZWQ6JywgJzppbXA6Jyxcbic6aW5mb3JtYXRpb25fZGVza19wZXJzb246JywgJzppbm5vY2VudDonLCAnOmphcGFuZXNlX2dvYmxpbjonLFxuJzpqYXBhbmVzZV9vZ3JlOicsICc6am95X2NhdDonLCAnOmpveTonLCAnOmtpc3M6JywgJzpraXNzaW5nX2NhdDonLFxuJzpraXNzaW5nX2Nsb3NlZF9leWVzOicsICc6a2lzc2luZ19oZWFydDonLCAnOmtpc3Npbmdfc21pbGluZ19leWVzOicsXG4nOmtpc3Npbmc6JywgJzpsYXVnaGluZzonLCAnOmxpcHM6JywgJzpsb3ZlX2xldHRlcjonLFxuJzptYW5fd2l0aF9ndWFfcGlfbWFvOicsICc6bWFuX3dpdGhfdHVyYmFuOicsICc6bWFuOicsICc6bWFzazonLFxuJzptYXNzYWdlOicsICc6bWV0YWw6JywgJzptdXNjbGU6JywgJzptdXNpY2FsX25vdGU6JywgJzpuYWlsX2NhcmU6Jyxcbic6bmVja2JlYXJkOicsICc6bmV1dHJhbF9mYWNlOicsICc6bm9fZ29vZDonLCAnOm5vX21vdXRoOicsICc6bm9zZTonLFxuJzpub3RlczonLCAnOm9rX2hhbmQ6JywgJzpva193b21hbjonLCAnOm9sZGVyX21hbjonLCAnOm9sZGVyX3dvbWFuOicsXG4nOm9wZW5faGFuZHM6JywgJzpvcGVuX21vdXRoOicsICc6cGVuc2l2ZTonLCAnOnBlcnNldmVyZTonLFxuJzpwZXJzb25fZnJvd25pbmc6JywgJzpwZXJzb25fd2l0aF9ibG9uZF9oYWlyOicsXG4nOnBlcnNvbl93aXRoX3BvdXRpbmdfZmFjZTonLCAnOnBvaW50X2Rvd246JywgJzpwb2ludF9sZWZ0OicsXG4nOnBvaW50X3JpZ2h0OicsICc6cG9pbnRfdXBfMjonLCAnOnBvaW50X3VwOicsICc6cG9vcDonLCAnOnBvdXRpbmdfY2F0OicsXG4nOnByYXk6JywgJzpwcmluY2VzczonLCAnOnB1bmNoOicsICc6cHVycGxlX2hlYXJ0OicsICc6cXVlc3Rpb246Jyxcbic6cmFnZTonLCAnOnJhZ2UxOicsICc6cmFnZTI6JywgJzpyYWdlMzonLCAnOnJhZ2U0OicsICc6cmFpc2VkX2hhbmQ6Jyxcbic6cmFpc2VkX2hhbmRzOicsICc6cmVsYXhlZDonLCAnOnJlbGlldmVkOicsICc6cmV2b2x2aW5nX2hlYXJ0czonLFxuJzpydW5uZXI6JywgJzpydW5uaW5nOicsICc6c2F0aXNmaWVkOicsICc6c2NyZWFtX2NhdDonLCAnOnNjcmVhbTonLFxuJzpzZWVfbm9fZXZpbDonLCAnOnNoaXQ6JywgJzpza3VsbDonLCAnOnNsZWVwaW5nOicsICc6c2xlZXB5OicsXG4nOnNtaWxlX2NhdDonLCAnOnNtaWxlOicsICc6c21pbGV5X2NhdDonLCAnOnNtaWxleTonLCAnOnNtaWxpbmdfaW1wOicsXG4nOnNtaXJrX2NhdDonLCAnOnNtaXJrOicsICc6c29iOicsICc6c3BhcmtsaW5nX2hlYXJ0OicsICc6c3BhcmtsZXM6Jyxcbic6c3BlYWtfbm9fZXZpbDonLCAnOnNwZWVjaF9iYWxsb29uOicsICc6c3RhcjonLCAnOnN0YXIyOicsXG4nOnN0dWNrX291dF90b25ndWVfY2xvc2VkX2V5ZXM6JywgJzpzdHVja19vdXRfdG9uZ3VlX3dpbmtpbmdfZXllOicsXG4nOnN0dWNrX291dF90b25ndWU6JywgJzpzdW5nbGFzc2VzOicsICc6c3VzcGVjdDonLCAnOnN3ZWF0X2Ryb3BzOicsXG4nOnN3ZWF0X3NtaWxlOicsICc6c3dlYXQ6JywgJzp0aG91Z2h0X2JhbGxvb246JywgJzotMTonLCAnOnRodW1ic2Rvd246Jyxcbic6dGh1bWJzdXA6JywgJzorMTonLCAnOnRpcmVkX2ZhY2U6JywgJzp0b25ndWU6JywgJzp0cml1bXBoOicsXG4nOnRyb2xsZmFjZTonLCAnOnR3b19oZWFydHM6JywgJzp0d29fbWVuX2hvbGRpbmdfaGFuZHM6Jyxcbic6dHdvX3dvbWVuX2hvbGRpbmdfaGFuZHM6JywgJzp1bmFtdXNlZDonLCAnOnY6JywgJzp3YWxraW5nOicsICc6d2F2ZTonLFxuJzp3ZWFyeTonLCAnOndpbmsyOicsICc6d2luazonLCAnOndvbWFuOicsICc6d29ycmllZDonLCAnOnllbGxvd19oZWFydDonLFxuJzp5dW06JywgJzp6eno6JywgJzoxMDk6JywgJzpob3VzZTonLCAnOmhvdXNlX3dpdGhfZ2FyZGVuOicsICc6c2Nob29sOicsXG4nOm9mZmljZTonLCAnOnBvc3Rfb2ZmaWNlOicsICc6aG9zcGl0YWw6JywgJzpiYW5rOicsXG4nOmNvbnZlbmllbmNlX3N0b3JlOicsICc6bG92ZV9ob3RlbDonLCAnOmhvdGVsOicsICc6d2VkZGluZzonLCAnOmNodXJjaDonLFxuJzpkZXBhcnRtZW50X3N0b3JlOicsICc6ZXVyb3BlYW5fcG9zdF9vZmZpY2U6JywgJzpjaXR5X3N1bnJpc2U6Jyxcbic6Y2l0eV9zdW5zZXQ6JywgJzpqYXBhbmVzZV9jYXN0bGU6JywgJzpldXJvcGVhbl9jYXN0bGU6JywgJzp0ZW50OicsXG4nOmZhY3Rvcnk6JywgJzp0b2t5b190b3dlcjonLCAnOmphcGFuOicsICc6bW91bnRfZnVqaTonLFxuJzpzdW5yaXNlX292ZXJfbW91bnRhaW5zOicsICc6c3VucmlzZTonLCAnOnN0YXJzOicsICc6c3RhdHVlX29mX2xpYmVydHk6Jyxcbic6YnJpZGdlX2F0X25pZ2h0OicsICc6Y2Fyb3VzZWxfaG9yc2U6JywgJzpyYWluYm93OicsICc6ZmVycmlzX3doZWVsOicsXG4nOmZvdW50YWluOicsICc6cm9sbGVyX2NvYXN0ZXI6JywgJzpzaGlwOicsICc6c3BlZWRib2F0OicsICc6Ym9hdDonLFxuJzpzYWlsYm9hdDonLCAnOnJvd2JvYXQ6JywgJzphbmNob3I6JywgJzpyb2NrZXQ6JywgJzphaXJwbGFuZTonLFxuJzpoZWxpY29wdGVyOicsICc6c3RlYW1fbG9jb21vdGl2ZTonLCAnOnRyYW06JywgJzptb3VudGFpbl9yYWlsd2F5OicsXG4nOmJpa2U6JywgJzphZXJpYWxfdHJhbXdheTonLCAnOnN1c3BlbnNpb25fcmFpbHdheTonLFxuJzptb3VudGFpbl9jYWJsZXdheTonLCAnOnRyYWN0b3I6JywgJzpibHVlX2NhcjonLCAnOm9uY29taW5nX2F1dG9tb2JpbGU6Jyxcbic6Y2FyOicsICc6cmVkX2NhcjonLCAnOnRheGk6JywgJzpvbmNvbWluZ190YXhpOicsICc6YXJ0aWN1bGF0ZWRfbG9ycnk6Jyxcbic6YnVzOicsICc6b25jb21pbmdfYnVzOicsICc6cm90YXRpbmdfbGlnaHQ6JywgJzpwb2xpY2VfY2FyOicsXG4nOm9uY29taW5nX3BvbGljZV9jYXI6JywgJzpmaXJlX2VuZ2luZTonLCAnOmFtYnVsYW5jZTonLCAnOm1pbmlidXM6Jyxcbic6dHJ1Y2s6JywgJzp0cmFpbjonLCAnOnN0YXRpb246JywgJzp0cmFpbjI6JywgJzpidWxsZXR0cmFpbl9mcm9udDonLFxuJzpidWxsZXR0cmFpbl9zaWRlOicsICc6bGlnaHRfcmFpbDonLCAnOm1vbm9yYWlsOicsICc6cmFpbHdheV9jYXI6Jyxcbic6dHJvbGxleWJ1czonLCAnOnRpY2tldDonLCAnOmZ1ZWxwdW1wOicsICc6dmVydGljYWxfdHJhZmZpY19saWdodDonLFxuJzp0cmFmZmljX2xpZ2h0OicsICc6d2FybmluZzonLCAnOmNvbnN0cnVjdGlvbjonLCAnOmJlZ2lubmVyOicsICc6YXRtOicsXG4nOnNsb3RfbWFjaGluZTonLCAnOmJ1c3N0b3A6JywgJzpiYXJiZXI6JywgJzpob3RzcHJpbmdzOicsXG4nOmNoZWNrZXJlZF9mbGFnOicsICc6Y3Jvc3NlZF9mbGFnczonLCAnOml6YWtheWFfbGFudGVybjonLCAnOm1veWFpOicsXG4nOmNpcmN1c190ZW50OicsICc6cGVyZm9ybWluZ19hcnRzOicsICc6cm91bmRfcHVzaHBpbjonLFxuJzp0cmlhbmd1bGFyX2ZsYWdfb25fcG9zdDonLCAnOmpwOicsICc6a3I6JywgJzpjbjonLCAnOnVzOicsICc6ZnI6Jyxcbic6ZXM6JywgJzppdDonLCAnOnJ1OicsICc6Z2I6JywgJzp1azonLCAnOmRlOicsICc6MTAwOicsICc6MTIzNDonLFxuJzpvbmU6JywgJzp0d286JywgJzp0aHJlZTonLCAnOmZvdXI6JywgJzpmaXZlOicsICc6c2l4OicsICc6c2V2ZW46Jyxcbic6ZWlnaHQ6JywgJzpuaW5lOicsICc6a2V5Y2FwX3RlbjonLCAnOnplcm86JywgJzpoYXNoOicsICc6c3ltYm9sczonLFxuJzphcnJvd19iYWNrd2FyZDonLCAnOmFycm93X2Rvd246JywgJzphcnJvd19mb3J3YXJkOicsICc6YXJyb3dfbGVmdDonLFxuJzpjYXBpdGFsX2FiY2Q6JywgJzphYmNkOicsICc6YWJjOicsICc6YXJyb3dfbG93ZXJfbGVmdDonLFxuJzphcnJvd19sb3dlcl9yaWdodDonLCAnOmFycm93X3JpZ2h0OicsICc6YXJyb3dfdXA6Jyxcbic6YXJyb3dfdXBwZXJfbGVmdDonLCAnOmFycm93X3VwcGVyX3JpZ2h0OicsICc6YXJyb3dfZG91YmxlX2Rvd246Jyxcbic6YXJyb3dfZG91YmxlX3VwOicsICc6YXJyb3dfZG93bl9zbWFsbDonLCAnOmFycm93X2hlYWRpbmdfZG93bjonLFxuJzphcnJvd19oZWFkaW5nX3VwOicsICc6bGVmdHdhcmRzX2Fycm93X3dpdGhfaG9vazonLCAnOmFycm93X3JpZ2h0X2hvb2s6Jyxcbic6bGVmdF9yaWdodF9hcnJvdzonLCAnOmFycm93X3VwX2Rvd246JywgJzphcnJvd191cF9zbWFsbDonLFxuJzphcnJvd3NfY2xvY2t3aXNlOicsICc6YXJyb3dzX2NvdW50ZXJjbG9ja3dpc2U6JywgJzpyZXdpbmQ6Jyxcbic6ZmFzdF9mb3J3YXJkOicsICc6aW5mb3JtYXRpb25fc291cmNlOicsICc6b2s6Jyxcbic6dHdpc3RlZF9yaWdodHdhcmRzX2Fycm93czonLCAnOnJlcGVhdDonLCAnOnJlcGVhdF9vbmU6JywgJzpuZXc6Jyxcbic6dG9wOicsICc6dXA6JywgJzpjb29sOicsICc6ZnJlZTonLCAnOm5nOicsICc6Y2luZW1hOicsICc6a29rbzonLFxuJzpzaWduYWxfc3RyZW5ndGg6JywgJzp1NTI3MjonLCAnOnU1NDA4OicsICc6dTU1YjY6JywgJzp1NjMwNzonLFxuJzp1NjcwODonLCAnOnU2NzA5OicsICc6dTZlODA6JywgJzp1NzEyMTonLCAnOnU3NTMzOicsICc6dTdhN2E6Jyxcbic6dTc5ODE6JywgJzpzYTonLCAnOnJlc3Ryb29tOicsICc6bWVuczonLCAnOndvbWVuczonLCAnOmJhYnlfc3ltYm9sOicsXG4nOm5vX3Ntb2tpbmc6JywgJzpwYXJraW5nOicsICc6d2hlZWxjaGFpcjonLCAnOm1ldHJvOicsICc6YmFnZ2FnZV9jbGFpbTonLFxuJzphY2NlcHQ6JywgJzp3YzonLCAnOnBvdGFibGVfd2F0ZXI6JywgJzpwdXRfbGl0dGVyX2luX2l0c19wbGFjZTonLFxuJzpzZWNyZXQ6JywgJzpjb25ncmF0dWxhdGlvbnM6JywgJzptOicsICc6cGFzc3BvcnRfY29udHJvbDonLFxuJzpsZWZ0X2x1Z2dhZ2U6JywgJzpjdXN0b21zOicsICc6aWRlb2dyYXBoX2FkdmFudGFnZTonLCAnOmNsOicsICc6c29zOicsXG4nOmlkOicsICc6bm9fZW50cnlfc2lnbjonLCAnOnVuZGVyYWdlOicsICc6bm9fbW9iaWxlX3Bob25lczonLFxuJzpkb19ub3RfbGl0dGVyOicsICc6bm9uLXBvdGFibGVfd2F0ZXI6JywgJzpub19iaWN5Y2xlczonLFxuJzpub19wZWRlc3RyaWFuczonLCAnOmNoaWxkcmVuX2Nyb3NzaW5nOicsICc6bm9fZW50cnk6Jyxcbic6ZWlnaHRfc3Bva2VkX2FzdGVyaXNrOicsICc6ZWlnaHRfcG9pbnRlZF9ibGFja19zdGFyOicsXG4nOmhlYXJ0X2RlY29yYXRpb246JywgJzp2czonLCAnOnZpYnJhdGlvbl9tb2RlOicsICc6bW9iaWxlX3Bob25lX29mZjonLFxuJzpjaGFydDonLCAnOmN1cnJlbmN5X2V4Y2hhbmdlOicsICc6YXJpZXM6JywgJzp0YXVydXM6JywgJzpnZW1pbmk6Jyxcbic6Y2FuY2VyOicsICc6bGVvOicsICc6dmlyZ286JywgJzpsaWJyYTonLCAnOnNjb3JwaXVzOicsICc6c2FnaXR0YXJpdXM6Jyxcbic6Y2Fwcmljb3JuOicsICc6YXF1YXJpdXM6JywgJzpwaXNjZXM6JywgJzpvcGhpdWNodXM6Jyxcbic6c2l4X3BvaW50ZWRfc3RhcjonLCAnOm5lZ2F0aXZlX3NxdWFyZWRfY3Jvc3NfbWFyazonLCAnOmE6JywgJzpiOicsXG4nOmFiOicsICc6bzI6JywgJzpkaWFtb25kX3NoYXBlX3dpdGhfYV9kb3RfaW5zaWRlOicsICc6cmVjeWNsZTonLCAnOmVuZDonLFxuJzpvbjonLCAnOnNvb246JywgJzpjbG9jazE6JywgJzpjbG9jazEzMDonLCAnOmNsb2NrMTA6JywgJzpjbG9jazEwMzA6Jyxcbic6Y2xvY2sxMTonLCAnOmNsb2NrMTEzMDonLCAnOmNsb2NrMTI6JywgJzpjbG9jazEyMzA6JywgJzpjbG9jazI6Jyxcbic6Y2xvY2syMzA6JywgJzpjbG9jazM6JywgJzpjbG9jazMzMDonLCAnOmNsb2NrNDonLCAnOmNsb2NrNDMwOicsXG4nOmNsb2NrNTonLCAnOmNsb2NrNTMwOicsICc6Y2xvY2s2OicsICc6Y2xvY2s2MzA6JywgJzpjbG9jazc6Jyxcbic6Y2xvY2s3MzA6JywgJzpjbG9jazg6JywgJzpjbG9jazgzMDonLCAnOmNsb2NrOTonLCAnOmNsb2NrOTMwOicsXG4nOmhlYXZ5X2RvbGxhcl9zaWduOicsICc6Y29weXJpZ2h0OicsICc6cmVnaXN0ZXJlZDonLCAnOnRtOicsICc6eDonLFxuJzpoZWF2eV9leGNsYW1hdGlvbl9tYXJrOicsICc6YmFuZ2Jhbmc6JywgJzppbnRlcnJvYmFuZzonLCAnOm86Jyxcbic6aGVhdnlfbXVsdGlwbGljYXRpb25feDonLCAnOmhlYXZ5X3BsdXNfc2lnbjonLCAnOmhlYXZ5X21pbnVzX3NpZ246Jyxcbic6aGVhdnlfZGl2aXNpb25fc2lnbjonLCAnOndoaXRlX2Zsb3dlcjonLCAnOmhlYXZ5X2NoZWNrX21hcms6Jyxcbic6YmFsbG90X2JveF93aXRoX2NoZWNrOicsICc6cmFkaW9fYnV0dG9uOicsICc6bGluazonLCAnOmN1cmx5X2xvb3A6Jyxcbic6d2F2eV9kYXNoOicsICc6cGFydF9hbHRlcm5hdGlvbl9tYXJrOicsICc6dHJpZGVudDonLCAnOmJsYWNrX3NxdWFyZTonLFxuJzp3aGl0ZV9zcXVhcmU6JywgJzp3aGl0ZV9jaGVja19tYXJrOicsICc6YmxhY2tfc3F1YXJlX2J1dHRvbjonLFxuJzp3aGl0ZV9zcXVhcmVfYnV0dG9uOicsICc6YmxhY2tfY2lyY2xlOicsICc6d2hpdGVfY2lyY2xlOicsXG4nOnJlZF9jaXJjbGU6JywgJzpsYXJnZV9ibHVlX2NpcmNsZTonLCAnOmxhcmdlX2JsdWVfZGlhbW9uZDonLFxuJzpsYXJnZV9vcmFuZ2VfZGlhbW9uZDonLCAnOnNtYWxsX2JsdWVfZGlhbW9uZDonLFxuJzpzbWFsbF9vcmFuZ2VfZGlhbW9uZDonLCAnOnNtYWxsX3JlZF90cmlhbmdsZTonLFxuJzpzbWFsbF9yZWRfdHJpYW5nbGVfZG93bjonLCAnOnNoaXBpdDonXTtcbiIsIi8qKlxuKiBAb3ZlcnZpZXcgRW1vamlzIGFyZSBhbiBlc3NlbnRpYWwgYXNwZWN0IG9mIHRvZGF5J3MgY2hhdCBjb252ZXJzYXRpb25zIGFuZCBhcHBsaWNhdGlvbnMuIFdpdGggdGhlIENoYXRFbmdpbmUgRW1vamkgcGx1Z2luLCB5b3UgY2FuIGVuYWJsZSB0aGUgYWJpbGl0eSBmb3IgeW91ciB1c2VycyB0byB1c2UgZW1vamlzIGluIHRoZWlyIGNvbnZlcnNhdGlvbnMuXG4qIEBtb2R1bGUgY2hhdC1lbmdpbmUtZW1vamlcbiogQGRlc2NyaXB0aW9uICBQYXJzZXMgZW1vamkgaW4gYGBgcGF5bG9hZC5kYXRhLnRleHRgYGAuXG4qL1xuXG5jb25zdCBlbW9qaXMgPSByZXF1aXJlKCcuL2Vtb2ppLmpzJyk7XG5jb25zdCBkb3R0eSA9IHJlcXVpcmUoXCJkb3R0eVwiKTtcblxuLy8gdGhpcyBpcyBhbiBleGFtcGxlIG9mIG1pZGRsZXdhcmUgdXNlZCBpbiBvdXIgdGVzdC5qc1xuLy8gYWRkcyBzb21lIHRleHQgdG8gbWVzc2FnZSBiZWZvcmUgaXQncyBzZW50IGFuZCB3aGVuIGl0J3MgcmVjZWl2ZWRcblxuLyoqXG4qIEBmdW5jdGlvblxuKiBAY2VwbHVnaW5cbiogQHJlcXVpcmVzIHtAbGluayBDaGF0RW5naW5lfVxuKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIFRoZSBjb25maWcgb2JqZWN0XG4qIEBwYXJhbSB7U3RyaW5nfSBbcHJvcD1cImRhdGEudGV4dFwiXSBUaGUgcGF5bG9hZCB0byBzZWFyY2ggZm9yLlxuKiBAcGFyYW0ge1N0cmluZ30gW2V2ZW50PVwibWVzc2FnZVwiXSBUaGUgQ2hhdEVuZ2luZSBldmVudCB0aGF0IHdpbGwgdHJpZ2dlciBlbW9qaSBwYXJzaW5nLlxuKiBAcGFyYW0ge0Z1bmN0aW9ufSBjb25maWcudGl0bGUgVGhlIHRpdGxlIG9mIHRoZSBkZXNrdG9wIG5vdGlmaWNhdGlvblxuKiBAcGFyYW0ge0ludGVnZXJ9IFtoZWlnaHQ9MTZdIFRoZSBoZWlnaHQgb2YgdGhlIHJlc3VsdGluZyBlbW9qacOfIGltYWdlc1xuKiBAcGFyYW0ge1N0cmluZ30gW3VybF0gVGhlIHdlYiBkaXJlY3Rvcnkgd2hlcmUgZW1vamkgaW1hZ2VzIGFyZSBob3N0ZWQuIEZpbGVuYW1lIChleDogL3NtaWxlLnBuZykgd2lsbCBiZSBhZGRlZC5cbiogQGV4YW1wbGVcbipcbipcbiogY29uc3QgZW1vamkgPSByZXF1aXJlKCcuL3NyYy9wbHVnaW4uanMnKTtcbiogY2hhdCA9IG5ldyBPQ0YuQ2hhdCgnZW1vamktY2hhdCcpO1xuKiBjaGF0LnBsdWdpbihlbW9qaSgpKTtcbiogY2hhdC5vbignbWVzc2FnZScsIChwYXlsb2FkKSA9PiB7XG4qICAgICAvLyBwYXlsb2FkLmRhdGEudGV4dCA9PSAnPGltZyBjbGFzcz1cImVtb2ppXCIgdGl0bGU9XCI6cGl6emE6XCIgYWx0PVwicGl6emFcIiBzcmM9XCJodHRwOi8vd3d3LndlYnBhZ2VmeC5jb20vdG9vbHMvZW1vamktY2hlYXQtc2hlZXQvZ3JhcGhpY3MvZW1vamlzL3BpenphLnBuZ1wiIGhlaWdodD1cIjE2XCIgLz4nO1xuKiB9KTtcbipcbiogY2hhdC5lbWl0KCdtZXNzYWdlJywge1xuKiAgICAgdGV4dDogJ0kgd2FudCA6cGl6emE6J1xuKiB9KTtcbiovXG5tb2R1bGUuZXhwb3J0cyA9IChjb25maWcgPSB7fSkgPT4ge1xuXG4gICAgLy8gcmVndWxhciBleHByZXNzaW9uIHRvIGZpbmQgZW1vamkgc3RyaW5nc1xuICAgIGNvbnN0IHRlc3QgPSAvOlthLXowLTlfXFwtXFwrXSs6L2c7XG5cbiAgICBjb25maWcuZXZlbnQgPSBjb25maWcuZXZlbnQgfHwgJ21lc3NhZ2UnO1xuXG4gICAgLy8gd2hlcmUgaW4gdGhlIHBheWxvYWQgdGhlIHRleHQgaXNcbiAgICBjb25maWcucHJvcCA9IGNvbmZpZy5wcm9wIHx8ICdkYXRhLnRleHQnO1xuXG4gICAgY29uZmlnLmhlaWdodCA9IGNvbmZpZy5oZWlnaHQgfHwgMTY7XG5cbiAgICAvLyB3aGVyZSBlbW9qaSBpbWFnZXMgYXJlIGhvc3RlZC4gZmlsZW5hbWUgKGV4OiAvc21pbGUucG5nKSB3aWxsIGJlIGFkZGVkXG4gICAgY29uZmlnLnVybCA9IGNvbmZpZy51cmwgfHwgJ2h0dHA6Ly93d3cud2VicGFnZWZ4LmNvbS90b29scy9lbW9qaS1jaGVhdC1zaGVldC9ncmFwaGljcy9lbW9qaXMnO1xuXG4gICAgLy8gZnVuY3Rpb24gdG8gcGFyc2Ugc3RyaW5nIGZvciA6c21pbGU6IGFuZCBvdGhlciBlbW9qaVxuICAgIGNvbnN0IGVtb2ppID0gKHNvbWVTdHJpbmcsIHVybCA9IGNvbmZpZy51cmwsIGhlaWdodCA9IGNvbmZpZy5oZWlnaHQpID0+IHNvbWVTdHJpbmcucmVwbGFjZSh0ZXN0LCAobWF0Y2gpID0+IHtcblxuICAgICAgICAvLyB1c2UgcmVnZXggdG8gZmluZCBlbW9qaSBhbmQgcmVwbGFjZSB3aXRoIGh0bWxcbiAgICAgICAgbGV0IHJlc3VsdCA9IG1hdGNoO1xuXG4gICAgICAgIC8vIGlmIHRleHQgc3RyaW5nIGlzIGluIGxpc3Qgb2YgZW1vamlzXG4gICAgICAgIGlmIChlbW9qaXMuaW5kZXhPZihtYXRjaCkgIT09IC0xKSB7XG5cbiAgICAgICAgICAgIC8vIHJlbW92ZSB0aGUgOiBiZWZvcmUgYW5kIGFmdGVyXG4gICAgICAgICAgICBsZXQgbmFtZSA9IFN0cmluZyhtYXRjaCkuc2xpY2UoMSwgLTEpO1xuXG4gICAgICAgICAgICAvLyByZXR1cm4gaHRtbCBpbWFnZSwgdXNpbmcgdXJsIGFuZCBoZWlnaHQgc3VwcGxpZWQgaW5cbiAgICAgICAgICAgIC8vIGZ1bmN0aW9uXG4gICAgICAgICAgICByZXN1bHQgPSAnPGltZyBjbGFzcz1cImVtb2ppXCIgdGl0bGU9XCI6JyArIG5hbWVcbiAgICAgICAgICAgICAgICArICc6XCIgYWx0PVwiJyArIG5hbWUgKyAnXCIgc3JjPVwiJyArIHVybCArICcvJ1xuICAgICAgICAgICAgICAgICsgZW5jb2RlVVJJQ29tcG9uZW50KG5hbWUpICsgJy5wbmdcIidcbiAgICAgICAgICAgICAgICArIChoZWlnaHQgPyAoJyBoZWlnaHQ9XCInICsgaGVpZ2h0ICsgJ1wiJykgOiAnJylcbiAgICAgICAgICAgICAgICArICcgLz4nO1xuXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuXG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAqIFR1cm5zYGBgOnNtaWxlOmBgYCBpbnRvIGBgYDxpbWcgc3JjPVwiL3NtaWxlLnBuZ1wiIC8+YGBgXG4gICAgKiBAbGlzdGVucyBtZXNzYWdlXG4gICAgKiBAbGlzdGVucyAkaGlzdG9yeS5tZXNzYWdlXG4gICAgKiBAY2VleHRlbmRzIENoYXRcbiAgICAqL1xuICAgIGxldCBwYXJzZUVtb2ppID0gZnVuY3Rpb24ocGF5bG9hZCwgbmV4dCkge1xuXG4gICAgICAgIGxldCBtZXNzYWdlID0gZG90dHkuZ2V0KHBheWxvYWQsIGNvbmZpZy5wcm9wKTtcblxuICAgICAgICAvLyBjaGVjayBpZiB0aGlzIHN1YiBwcm9wZXJ0eSBleGlzdHNcbiAgICAgICAgaWYobWVzc2FnZS5sZW5ndGgpIHtcblxuICAgICAgICAgICAgLy8gcGFyc2UgZW1vamlcbiAgICAgICAgICAgIGxldCBuZXdQYXlsb2FkID0gZW1vamkobWVzc2FnZSwgY29uZmlnLnVybCwgY29uZmlnLmhlaWdodCk7XG4gICAgICAgICAgICBkb3R0eS5wdXQocGF5bG9hZCwgY29uZmlnLnByb3AsIG5ld1BheWxvYWQpO1xuXG4gICAgICAgIH1cblxuICAgICAgICAvLyBjb250aW51ZSBhbG9uZyBtaWRkbGV3YXJlXG4gICAgICAgIG5leHQobnVsbCwgcGF5bG9hZCk7XG5cbiAgICB9O1xuXG4gICAgLy8gdGhlc2UgYXJlIG5ldyBtZXRob2RzIHRoYXQgd2lsbCBiZSBhZGRlZCB0byB0aGUgZXh0ZW5kZWQgY2xhc3NcbiAgICBjbGFzcyBleHRlbnNpb24ge1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZW5kZXJzIGVtb2ppIGdpdmVuIGBgYDpzbWlsZTpgYGAgYXMgaW5wdXQuXG4gICAgICAgICAqIEBtZXRob2QgcmVuZGVyXG4gICAgICAgICAqIEBjZWV4dGVuZHMgQ2hhdFxuICAgICAgICAgKiBAcGFyYW0gIHtTdHJpbmd9IHN0cmluZyBUaGUgZW1vamkgdGV4dCB0byB0dXJuIGludG8gYW4gaWNvblxuICAgICAgICAgKiBAcGFyYW0gIHtTdHJpbmd9IHVybCBSb290IHVybCB0byBsb29rIGZvciBlbW9qaSBpbWFnZXNcbiAgICAgICAgICogQHBhcmFtICB7SW50fSBoZWlnaHQgSGVpZ2h0IG9mIHRoZSBlbW9qaSBpY29uc1xuICAgICAgICAgKiBAcmV0dXJucyB7U3RyaW5nfSBSZXR1cm5zIHRoZSBJTUcgSFRNTCBmb3IgdGhpcyBlbW9qaVxuICAgICAgICAgKi9cbiAgICAgICAgcmVuZGVyKHN0cmluZywgdXJsLCBoZWlnaHQpIHtcbiAgICAgICAgICAgIHJldHVybiBlbW9qaShzdHJpbmcsIHVybCwgaGVpZ2h0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBGaW5kcyBwYXJ0aWFsIHN0cmluZyBtYXRjaGVzIG9mIGVtb2ppIHRleHQgYnkgc2VhcmNoaW5nIGVtb2ppIGRiLlxuICAgICAgICAgKiBAbWV0aG9kIHNlYXJjaFxuICAgICAgICAgKiBAY2VleHRlbmRzIENoYXRcbiAgICAgICAgICogQHBhcmFtICB7U3RyaW5nc30gcXVlcnkgVGhlIHBhcnRpYWwgdGV4dCB0byBzZWFyY2ggZm9yXG4gICAgICAgICAqIEByZXR1cm5zIHtBcnJheX0gQW4gYXJyYXkgb2YgbWF0Y2hpbmcgZW1vamkgc3RyaW5ncy4gQ2FsbCB0aGUgcmVuZGVyIGZ1bmN0aW9uIHRvIGRpc3BsYXkgdGhlc2UuXG4gICAgICAgICAqL1xuICAgICAgICBzZWFyY2gocXVlcnkpIHtcblxuICAgICAgICAgICAgdmFyIHJlc3VsdHMgPSBbXTtcblxuICAgICAgICAgICAgZm9yKHZhciBpIGluIGVtb2ppcykge1xuICAgICAgICAgICAgICAgIGlmKGVtb2ppc1tpXS5zdWJzdHJpbmcoMCwgcXVlcnkubGVuZ3RoKSA9PSBxdWVyeSkge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHRzLnB1c2goZW1vamlzW2ldKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiByZXN1bHRzO1xuXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBsZXQgcmVzdWx0ID0ge1xuICAgICAgICBuYW1lc3BhY2U6ICdlbW9qaScsXG4gICAgICAgIG1pZGRsZXdhcmU6IHtcbiAgICAgICAgICAgIG9uOiB7fVxuICAgICAgICB9LFxuICAgICAgICBleHRlbmRzOiB7XG4gICAgICAgICAgICBDaGF0OiBleHRlbnNpb25cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlc3VsdC5taWRkbGV3YXJlLm9uW2NvbmZpZy5ldmVudF0gPSBwYXJzZUVtb2ppO1xuICAgIHJlc3VsdC5taWRkbGV3YXJlLm9uWyckaGlzdG9yeS4nICsgY29uZmlnLmV2ZW50XSA9IHBhcnNlRW1vamk7XG5cbiAgICAvLyBtaWRkbGV3YXJlIHRlbGxzIHRoZSBmcmFtZXdvcmsgdG8gdXNlIHRoZXNlIGZ1bmN0aW9ucyB3aGVuXG4gICAgLy8gbWVzc2FnZXMgYXJlIHNlbnQgb3IgcmVjZWl2ZWRcbiAgICByZXR1cm4gcmVzdWx0O1xufVxuIl19
