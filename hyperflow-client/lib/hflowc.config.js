//default service locations
var proxyLocation = process.env.X509_USER_PROXY ? process.env.X509_USER_PROXY : 'user-proxy.pem';
var atmoLocation = process.env.ATMOSPHERE_URL ? process.env.ATMOSPHERE_URL : 'cloud.plgrid.pl';

//default ids of vms
var wfMainId = process.env.WF_MAIN_ID ? process.env.WF_MAIN_ID : 66;
var wfWorkerId = process.env.WF_WORDKER_ID ? process.env.WF_WORDKER_ID : 63;

var wfApplianceSetName = 'hfworkflow';

var type = 'plgrid';
var port = process.env.PORT ? process.env.PORT : '44464';
var walltime = process.env.WALLTIME ? process.env.WALLTIME : '00:10:00';
var workdir = process.env.WORKDIR ? process.env.WORKDIR : '$STORAGE/hyperflow';
var scriptsdir = process.env.SCRIPTSDIR ? process.env.SCRIPTSDIR : '~/.hyperflow/scripts_kopia/'
var grant = 'plgrid2016b'

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
    workdir: workdir,
    scriptsdir: scriptsdir,
    grant: grant
};

module.exports.configLocations = configLocations;
