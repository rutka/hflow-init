//default service locations
var proxyLocation = process.env.X509_USER_PROXY ? process.env.X509_USER_PROXY : 'user-proxy.pem';
var atmoLocation = process.env.ATMOSPHERE_URL ? process.env.ATMOSPHERE_URL : 'cloud.plgrid.pl';

//default ids of vms
var wfMainId = process.env.WF_MAIN_ID ? process.env.WF_MAIN_ID : 66;
var wfWorkerId = process.env.WF_WORDKER_ID ? process.env.WF_WORDKER_ID : 63;

var wfApplianceSetName = 'hfworkflow';

var type = 'plgrid';
var port = process.env.PORT ? process.env.PORT : '44464';
var walltime = '00:10:00';
var workdir = '$STORAGE/hyperflow';

//default location of user stored config for hflowc
var configLocations = [
    '~/deployment.yml'
];

module.exports.default_config = {
    proxyLocation: proxyLocation,
    atmoLocation: atmoLocation,
    wfMainId: wfMainId,
    wfWorkerId: wfWorkerId,
    wfApplianceSetName: wfApplianceSetName,

    type : type,
    port: port,
    walltime: walltime,
    workdir: workdir
};

module.exports.configLocations = configLocations;
