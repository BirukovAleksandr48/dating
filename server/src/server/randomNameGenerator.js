export default () => {
    const first = ["autumn", "hidden", "bitter", "misty", "silent", "empty", "dry",
        "dark", "summer", "icy", "delicate", "quiet", "white", "cool", "spring",
        "winter", "patient", "twilight", "dawn", "crimson", "wispy", "weathered",
        "blue", "billowing", "broken", "cold", "damp", "falling", "frosty", "green",
        "long", "late", "lingering", "bold", "little", "morning", "muddy", "old",
        "red", "rough", "still", "small", "sparkling", "throbbing", "shy",
        "wandering", "withered", "wild", "black", "young", "holy", "solitary",
        "fragrant", "aged", "snowy", "proud", "floral", "restless", "divine",
        "polished", "ancient", "purple", "lively", "nameless"]
    const sec = ["waterfall", "river", "breeze", "moon", "rain", "wind", "sea",
        "morning", "snow", "lake", "sunset", "pine", "shadow", "leaf", "dawn",
        "glitter", "forest", "hill", "cloud", "meadow", "sun", "glade", "bird",
        "brook", "butterfly", "bush", "dew", "dust", "field", "fire", "flower",
        "firefly", "feather", "grass", "haze", "mountain", "night", "pond",
        "darkness", "snowflake", "silence", "sound", "sky", "shape", "surf",
        "thunder", "violet", "water", "wildflower", "wave", "water", "resonance",
        "sun", "wood", "dream", "cherry", "tree", "fog", "frost", "voice", "paper",
        "frog", "smoke", "star"];

    let firstpart = first[Math.floor(Math.random()*(first.length-1))];
    let secondpart = sec[Math.floor(Math.random()*(first.length-1))];

    firstpart = firstpart[0].toUpperCase() + firstpart.slice(1);
    secondpart = secondpart[0].toUpperCase() + secondpart.slice(1);

    return firstpart + ' ' + secondpart;
}