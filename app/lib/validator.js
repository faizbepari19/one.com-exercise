module.exports = {
    validation: (data, keys) => {
        if (keys.length != 0) {
            for (index in keys) {

                if (!data.hasOwnProperty(keys[index])) {
                    throw {
                        message: keys[index] + " is Mandatory"
                    };
                } else if (Array.isArray(data[keys[index]])) {
                    if (data[keys[index]].length == 0) {
                        throw {
                            message: keys[index] + " can not be empty"
                        };
                    }
                } else {
                    if (
                        data[keys[index]] === "" ||
                        data[keys[index]] == undefined ||
                        data[keys[index]] == "undefined" ||
                        data[keys[index]] == null ||
                        new RegExp("^\\s+$").test(data[keys[index]])
                    ) {
                        throw {
                            message: keys[index] + " can not be empty"
                        };
                    }

                }

            }
        } else {
            throw {
                message: "Input empty"
            };
        }
        return true
    },
}