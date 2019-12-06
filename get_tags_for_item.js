function get_tags_for_item(item_details) {
    // implement this
    pushCountryTags(tags_db.tags.countries, item_details, type = 'title')
    pushCountryTags(tags_db.tags.countries, item_details, type = 'description')
    pushColourTags(tags_db.tags.colours, item_details, type = 'color')
    return (JSON.stringify(output))  //JSON Output
}

function pushCountryTags(countries, item_details, type) {
    let tagAttribute = ''
    if (type === 'title') {
        tagAttribute = item_details.title;
    }
    else {
        if (type === 'description') {
            tagAttribute = item_details.description;
        }
    }
    let countryFound;
    for (country in countries) {
        for (alias in countries[country]) {
            if (tagAttribute.toLowerCase().includes(countries[country][alias])) {
                countryFound = true;
                if (type == 'title') {
                    output.title.countries.push(country)
                }
                else if (type == 'description') {
                    output.description.countries.push(country)
                }
                break;
            }
        }
        if (countryFound) {
            break;
        }
    }
}
function pushColourTags(colours, item_details, type) {
    let description = item_details.description;
    for (color in colours) {
        for (alias in colours[color]) {
            if (description.toLowerCase().includes(colours[color][alias])) {
                output.description.colours.push(color)
                break;
            }
        }
    }
}
var output = {
    "title": {
        "countries": []
    },
    "description": {
        "countries": [],
        "colours": []
    }
}
var tags_db = {
    "tags": {
        "countries": {
            "usa": ["united states of america", "united states", "usa"],
            "uk": ["uk", "united kingdom"],
            "uae": ["uae", "united arab emirates"],
            "yemen": ["yemen"],
            "utd": ["united", "utd"],
            "states": ["states"]
        },
        "colours": {
            "blue": ["blue", "turquoise"],
            "red": ["red", "crimson", "blood"]
        }
    },
    "rules": [
        { "field": "title", "tag_set": "countries" },
        { "field": "description", "tag_set": "countries" },
        { "field": "description", "tag_set": "colours" }
    ]
}
var item_1 = {
    "title": "US's crimson flag.",
    "description": "The United States is considering pulling out of ... The red, blue and white flag ..."
}
console.log(get_tags_for_item(item_1))