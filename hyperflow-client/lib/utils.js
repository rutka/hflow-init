var fs = require('fs'),
    expandHomeDir = require('expand-home-dir'),
    async = require('async');

function readFile(fileLocation, opts, cb) {
    fs.stat(fileLocation, function (err, stats) {
        if (err) {
            cb(new Error(err));
            return;
        }
        if (opts != null && opts.strict) {
            if (stats.mode.toString(8).substring(3, 6) != "600" || stats.uid != process.getuid()) {
                cb(new Error("File has wrong permissions (600 is required) or is not owned by the current user!"));
                return;
            }
        }
        if (stats.size > Math.pow(1024, 2) || !stats.isFile()) {
            cb(new Error('File ' + fileLocation + ' too large or not an ordinary file!'));
        } else {
            fs.readFile(fileLocation, {encoding: 'utf8'}, function (err, fileContents) {
                if (err) {
                    cb(err);
                    return;
                }
                cb(null, fileContents);
            });
        }
    });
}

function loadConfigs(configLocations, cb) {
    async.map(configLocations, function (configLocation, cb) {
        var absoluteConfigLocation = expandHomeDir(configLocation);
        fs.exists(absoluteConfigLocation, function (exists) {
            if (exists) {
                readFile(absoluteConfigLocation, function (err, rawConfig) {
                    if (err) {
                        console.log("Unable to read config from: ", absoluteConfigLocation);
                        cb(null, {});
                        return;
                    }
                    try {
                        cb(null, JSON.parse(rawConfig));
                    } catch (err) {
                        console.log("Unable to parse config from: ", absoluteConfigLocation);
                    }
                });
            } else {
                cb(null, {});
            }
        });
    }, function (err, results) {
        cb(results);
    });
}

var CAs = [
    //AddTrustExternalCARoot
    '-----BEGIN CERTIFICATE-----\nMIIENjCCAx6gAwIBAgIBATANBgkqhkiG9w0BAQUFADBvMQswCQYDVQQGEwJTRTEU\nMBIGA1UEChMLQWRkVHJ1c3QgQUIxJjAkBgNVBAsTHUFkZFRydXN0IEV4dGVybmFs\nIFRUUCBOZXR3b3JrMSIwIAYDVQQDExlBZGRUcnVzdCBFeHRlcm5hbCBDQSBSb290\nMB4XDTAwMDUzMDEwNDgzOFoXDTIwMDUzMDEwNDgzOFowbzELMAkGA1UEBhMCU0Ux\nFDASBgNVBAoTC0FkZFRydXN0IEFCMSYwJAYDVQQLEx1BZGRUcnVzdCBFeHRlcm5h\nbCBUVFAgTmV0d29yazEiMCAGA1UEAxMZQWRkVHJ1c3QgRXh0ZXJuYWwgQ0EgUm9v\ndDCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBALf3GjPm8gAELTngTlvt\nH7xsD821+iO2zt6bETOXpClMfZOfvUq8k+0DGuOPz+VtUFrWlymUWoCwSXrbLpX9\nuMq/NzgtHj6RQa1wVsfwTz/oMp50ysiQVOnGXw94nZpAPA6sYapeFI+eh6FqUNzX\nmk6vBbOmcZSccbNQYArHE504B4YCqOmoaSYYkKtMsE8jqzpPhNjfzp/haW+710LX\na0Tkx63ubUFfclpxCDezeWWkWaCUN/cALw3CknLa0Dhy2xSoRcRdKn23tNbE7qzN\nE0S3ySvdQwAl+mG5aWpYIxG3pzOPVnVZ9c0p10a3CitlttNCbxWyuHv77+ldU9U0\nWicCAwEAAaOB3DCB2TAdBgNVHQ4EFgQUrb2YejS0Jvf6xCZU7wO94CTLVBowCwYD\nVR0PBAQDAgEGMA8GA1UdEwEB/wQFMAMBAf8wgZkGA1UdIwSBkTCBjoAUrb2YejS0\nJvf6xCZU7wO94CTLVBqhc6RxMG8xCzAJBgNVBAYTAlNFMRQwEgYDVQQKEwtBZGRU\ncnVzdCBBQjEmMCQGA1UECxMdQWRkVHJ1c3QgRXh0ZXJuYWwgVFRQIE5ldHdvcmsx\nIjAgBgNVBAMTGUFkZFRydXN0IEV4dGVybmFsIENBIFJvb3SCAQEwDQYJKoZIhvcN\nAQEFBQADggEBALCb4IUlwtYj4g+WBpKdQZic2YR5gdkeWxQHIzZlj7DYd7usQWxH\nYINRsPkyPef89iYTx4AWpb9a/IfPeHmJIZriTAcKhjW88t5RxNKWt9x+Tu5w/Rw5\n6wwCURQtjr0W4MHfRnXnJK3s9EK0hZNwEGe6nQY1ShjTK3rMUUKhemPR5ruhxSvC\nNr4TDea9Y355e6cJDUCrat2PisP29owaQgVR1EX1n6diIWgVIEM8med8vSTYqZEX\nc4g/VhsxOBi0cQ+azcgOno4uG+GMmIPLHzHxREzGBHNJdmAPx/i9F4BrLunMTA5a\nmnkPIAou1Z5jJh5VkpTYghdae9C8x49OhgQ=\n-----END CERTIFICATE-----\n',
    //USERTrustRSAAddTrustCA
    '-----BEGIN CERTIFICATE-----\nMIIFdzCCBF+gAwIBAgIQE+oocFv07O0MNmMJgGFDNjANBgkqhkiG9w0BAQwFADBv\nMQswCQYDVQQGEwJTRTEUMBIGA1UEChMLQWRkVHJ1c3QgQUIxJjAkBgNVBAsTHUFk\nZFRydXN0IEV4dGVybmFsIFRUUCBOZXR3b3JrMSIwIAYDVQQDExlBZGRUcnVzdCBF\neHRlcm5hbCBDQSBSb290MB4XDTAwMDUzMDEwNDgzOFoXDTIwMDUzMDEwNDgzOFow\ngYgxCzAJBgNVBAYTAlVTMRMwEQYDVQQIEwpOZXcgSmVyc2V5MRQwEgYDVQQHEwtK\nZXJzZXkgQ2l0eTEeMBwGA1UEChMVVGhlIFVTRVJUUlVTVCBOZXR3b3JrMS4wLAYD\nVQQDEyVVU0VSVHJ1c3QgUlNBIENlcnRpZmljYXRpb24gQXV0aG9yaXR5MIICIjAN\nBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAgBJlFzYOw9sIs9CsVw127c0n00yt\nUINh4qogTQktZAnczomfzD2p7PbPwdzx07HWezcoEStH2jnGvDoZtF+mvX2do2NC\ntnbyqTsrkfjib9DsFiCQCT7i6HTJGLSR1GJk23+jBvGIGGqQIjy8/hPwhxR79uQf\njtTkUcYRZ0YIUcuGFFQ/vDP+fmyc/xadGL1RjjWmp2bIcmfbIWax1Jt4A8BQOujM\n8Ny8nkz+rwWWNR9XWrf/zvk9tyy29lTdyOcSOk2uTIq3XJq0tyA9yn8iNK5+O2hm\nAUTnAU5GU5szYPeUvlM3kHND8zLDU+/bqv50TmnHa4xgk97Exwzf4TKuzJM7UXiV\nZ4vuPVb+DNBpDxsP8yUmazNt925H+nND5X4OpWaxKXwyhGNVicQNwZNUMBkTrNN9\nN6frXTpsNVzbQdcS2qlJC9/YgIoJk2KOtWbPJYjNhLixP6Q5D9kCnusSTJV882sF\nqV4Wg8y4Z+LoE53MW4LTTLPtW//e5XOsIzstAL81VXQJSdhJWBp/kjbmUZIO8yZ9\nHE0XvMnsQybQv0FfQKlERPSZ51eHnlAfV1SoPv10Yy+xUGUJ5lhCLkMaTLTwJUdZ\n+gQek9QmRkpQgbLevni3/GcV4clXhB4PY9bpYrrWX1Uu6lzGKAgEJTm4Diup8kyX\nHAc/DVL17e8vgg8CAwEAAaOB9DCB8TAfBgNVHSMEGDAWgBStvZh6NLQm9/rEJlTv\nA73gJMtUGjAdBgNVHQ4EFgQUU3m/WqorSs9UgOHYm8Cd8rIDZsswDgYDVR0PAQH/\nBAQDAgGGMA8GA1UdEwEB/wQFMAMBAf8wEQYDVR0gBAowCDAGBgRVHSAAMEQGA1Ud\nHwQ9MDswOaA3oDWGM2h0dHA6Ly9jcmwudXNlcnRydXN0LmNvbS9BZGRUcnVzdEV4\ndGVybmFsQ0FSb290LmNybDA1BggrBgEFBQcBAQQpMCcwJQYIKwYBBQUHMAGGGWh0\ndHA6Ly9vY3NwLnVzZXJ0cnVzdC5jb20wDQYJKoZIhvcNAQEMBQADggEBAJNl9jeD\nlQ9ew4IcH9Z35zyKwKoJ8OkLJvHgwmp1ocd5yblSYMgpEg7wrQPWCcR23+WmgZWn\nRtqCV6mVksW2jwMibDN3wXsyF24HzloUQToFJBv2FAY7qCUkDrvMKnXduXBBP3zQ\nYzYhBx9G/2CkkeFnvN4ffhkUyWNnkepnB2u0j4vAbkN9w6GAbLIevFOFfdyQoaS8\nLe9Gclc1Bb+7RrtubTeZtv8jkpHGbkD4jylW6l/VXxRTrPBPYer3IsynVgviuDQf\nJtl7GQVoP7o81DgGotPmjw7jtHFtQELFhLRAlSv0ZaBIefYdgWOWnU914Ph85I6p\n0fKtirOMxyHNwu8=\n-----END CERTIFICATE-----\n',
    //TERENA SSL CA 2
    '-----BEGIN CERTIFICATE-----\nMIIF+TCCA+GgAwIBAgIRALD/zzodgkSYFWKdZIhqQWUwDQYJKoZIhvcNAQEMBQAw\ngYgxCzAJBgNVBAYTAlVTMRMwEQYDVQQIEwpOZXcgSmVyc2V5MRQwEgYDVQQHEwtK\nZXJzZXkgQ2l0eTEeMBwGA1UEChMVVGhlIFVTRVJUUlVTVCBOZXR3b3JrMS4wLAYD\nVQQDEyVVU0VSVHJ1c3QgUlNBIENlcnRpZmljYXRpb24gQXV0aG9yaXR5MB4XDTE0\nMTAwOTAwMDAwMFoXDTI0MTAwODIzNTk1OVowZDELMAkGA1UEBhMCTkwxFjAUBgNV\nBAgTDU5vb3JkLUhvbGxhbmQxEjAQBgNVBAcTCUFtc3RlcmRhbTEPMA0GA1UEChMG\nVEVSRU5BMRgwFgYDVQQDEw9URVJFTkEgU1NMIENBIDIwggEiMA0GCSqGSIb3DQEB\nAQUAA4IBDwAwggEKAoIBAQCwOm1/qbgAnvOFOghkLPlEDCC0sxVNBi2m8JPJSL73\nZK2kjhWzMYEUF/xu4osZdYs2Es8HbXZ4Jl4nvywWukL73R5Qj2SvdZsKOoKpMSVR\njn/EQt0fXJORu5T6cFf65/24uGjKm2oZJFQ3/jJhifciwY9j1dFpfklNvNfQ20zW\n9g+9wYhCk9aR+Z+WmRHqbnLngCFs8U6O7GO4Pa9lOdCFkip5Og7W6K2bJYmi1C5y\na3Oh0uLfzlhw/8BUAXdd+XadL0PaoibdHUKaTTixVv46tMtrbPJqnz+zrjun0BU+\nrCd/G/RZYFBWfp11JZ4/xna//5nM2PGpaolf3ucHzY2LAgMBAAGjggF/MIIBezAf\nBgNVHSMEGDAWgBRTeb9aqitKz1SA4dibwJ3ysgNmyzAdBgNVHQ4EFgQUW9CKHJoy\nW+C13ZZUG+GGKLD9tr0wDgYDVR0PAQH/BAQDAgGGMBIGA1UdEwEB/wQIMAYBAf8C\nAQAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMCwGA1UdIAQlMCMwDQYL\nKwYBBAGyMQECAh0wCAYGZ4EMAQIBMAgGBmeBDAECAjBQBgNVHR8ESTBHMEWgQ6BB\nhj9odHRwOi8vY3JsLnVzZXJ0cnVzdC5jb20vVVNFUlRydXN0UlNBQ2VydGlmaWNh\ndGlvbkF1dGhvcml0eS5jcmwwdgYIKwYBBQUHAQEEajBoMD8GCCsGAQUFBzAChjNo\ndHRwOi8vY3J0LnVzZXJ0cnVzdC5jb20vVVNFUlRydXN0UlNBQWRkVHJ1c3RDQS5j\ncnQwJQYIKwYBBQUHMAGGGWh0dHA6Ly9vY3NwLnVzZXJ0cnVzdC5jb20wDQYJKoZI\nhvcNAQEMBQADggIBAH2QaWZWVBxrPK5/JQgT6btkbPVniC+9wVEKrtNj9i3bcDEJ\nAH4di9rkMyGY4CGT28COJY5VBswqZeMD6FlyJ643mph8wvQTWhJxLW2r3zJpgacG\noosgHaiQ0iiqYdT2/6W/hoCOZ5EqIn4dlC0aYbsgIZCJ6NUKEQr2CLpeG8tsKIU+\nxRYPZf230bFhwaYl2Ia/Dvqb+tH1IqdnuBUu+Qitt3UCOfQpYfm/wKoX60LeJo+d\nZWQyB95sPTLTA+xH1XRpIDp+uHDvqaIqnFVCtuM+i9j/Jlr7fCZsiIWG15M+UPhE\nh9RQ0R1DMDK60rqNIQjK9+7Gbs6SWQgcU3N0j5z4160avk1G7qzEuYHrp1DMHWb8\nDg1+Bh24DtN+u5qHrgu2m4QEzsGgexbfArIYQ62ruSYJq6oEHVA37iq9IkGKALXc\nn8MF1OaCTGfaKwL1ZaxZKbt6DE5Ut9I7fQM7IGTGxehQKpKwX6BHl3JYX8EKb5/1\nPQnV5whodZLi1biej76NGztDjPNO1VSrdu3MUH8ume20tUn643V9ixFoDdU6+l1Q\nsCuBA3gstNuPv0xAW5KjohoKQV2sV/puV070B1XrYwgykwAkSl2dwsFSKJPByCQa\nppP7zX0/pnO8z2ideWMu5yUrQjg2sQtWwopf965KMdnfagbNL6OYCbwFgBPH\n-----END CERTIFICATE-----\n'
];

function getCAs() {
    return CAs;
}

module.exports.readFile = readFile;
module.exports.loadConfigs = loadConfigs;
module.exports.getCAs = getCAs;