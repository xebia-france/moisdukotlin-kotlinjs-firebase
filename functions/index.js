(function (_, Kotlin, $module$express, $module$cors, $module$firebase_admin, $module$firebase_functions) {
  'use strict';
  var ensureNotNull = Kotlin.ensureNotNull;
  var throwCCE = Kotlin.throwCCE;
  var Unit = Kotlin.kotlin.Unit;
  var equals = Kotlin.equals;
  var Kind_CLASS = Kotlin.Kind.CLASS;
  var defineInlineFunction = Kotlin.defineInlineFunction;
  function findEvents(db) {
    return db.collection('event').get();
  }
  function findEventById(db, eventId) {
    return db.collection('event').doc(eventId).get();
  }
  function saveEvent(db, inputEvent) {
    return db.collection('event').add(JSON.parse(JSON.stringify(inputEvent)));
  }
  var ArrayList_init = Kotlin.kotlin.collections.ArrayList_init_ww73n8$;
  function getAllEvents$lambda(closure$res) {
    return function (snapshot) {
      var $receiver = snapshot.docs;
      var destination = ArrayList_init($receiver.length);
      var tmp$;
      for (tmp$ = 0; tmp$ !== $receiver.length; ++tmp$) {
        var item = $receiver[tmp$];
        var tmp$_0, tmp$_1, tmp$_2, tmp$_3;
        destination.add_11rb$(new Event(item.id, typeof (tmp$_0 = ensureNotNull(item.data())['label']) === 'string' ? tmp$_0 : throwCCE(), typeof (tmp$_1 = ensureNotNull(item.data())['time']) === 'number' ? tmp$_1 : throwCCE(), typeof (tmp$_2 = ensureNotNull(item.data())['date']) === 'string' ? tmp$_2 : throwCCE(), typeof (tmp$_3 = ensureNotNull(item.data())['image']) === 'string' ? tmp$_3 : throwCCE()));
      }
      var result = destination;
      closure$res.status(200).json(result);
      return Unit;
    };
  }
  function getAllEvents$lambda_0(closure$res) {
    return function (err) {
      closure$res.status(500).json(err);
      return Unit;
    };
  }
  function getAllEvents(db, res) {
    findEvents(db).then(getAllEvents$lambda(res)).catch(getAllEvents$lambda_0(res));
  }
  function getEventById$lambda(closure$res) {
    return function (doc) {
      if (!doc.exists)
        closure$res.status(404).json(new Message('Event not found!'));
      else {
        var data = doc.data();
        closure$res.status(200).json(new Event(doc.id, data.label, data.time, data.date, data.image));
      }
      return Unit;
    };
  }
  function getEventById$lambda_0(closure$res) {
    return function (err) {
      closure$res.status(500).json(err);
      return Unit;
    };
  }
  function getEventById(db, eventId, res) {
    findEventById(db, eventId).then(getEventById$lambda(res)).catch(getEventById$lambda_0(res));
  }
  function main$lambda(closure$db) {
    return function (req, res) {
      var params = req.params;
      var eventId = params.id;
      if (!equals(eventId, undefined))
        getEventById(closure$db, eventId, res);
      else
        getAllEvents(closure$db, res);
      return Unit;
    };
  }
  function main$lambda$lambda(closure$res, closure$inputEvent) {
    return function (ref) {
      closure$res.status(201).json(new Event(ref.id, closure$inputEvent.label, closure$inputEvent.time, closure$inputEvent.date, closure$inputEvent.image));
      return Unit;
    };
  }
  function main$lambda$lambda_0(closure$res) {
    return function (error) {
      closure$res.status(500).json(error);
      return Unit;
    };
  }
  function main$lambda_0(closure$db) {
    return function (req, res) {
      var input = req.body;
      var inputEvent = new Event(void 0, input.label, (new Date()).getTime(), input.date, input.image);
      saveEvent(closure$db, inputEvent).then(main$lambda$lambda(res, inputEvent)).catch(main$lambda$lambda_0(res));
      return Unit;
    };
  }
  function main(args) {
    var app = new $module$express();
    app.use(new $module$cors());
    $module$firebase_admin.initializeApp($module$firebase_functions.config().firebase);
    var db = $module$firebase_admin.firestore();
    var getEvents = main$lambda(db);
    var createEvent = main$lambda_0(db);
    app.get('/event/:id?', getEvents);
    app.put('/event', createEvent);
    exports.v1 = $module$firebase_functions.https.onRequest(app);
  }
  function EventInput(label, date, image) {
    this.label = label;
    this.date = date;
    this.image = image;
  }
  EventInput.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'EventInput',
    interfaces: []
  };
  EventInput.prototype.component1 = function () {
    return this.label;
  };
  EventInput.prototype.component2 = function () {
    return this.date;
  };
  EventInput.prototype.component3 = function () {
    return this.image;
  };
  EventInput.prototype.copy_6hosri$ = function (label, date, image) {
    return new EventInput(label === void 0 ? this.label : label, date === void 0 ? this.date : date, image === void 0 ? this.image : image);
  };
  EventInput.prototype.toString = function () {
    return 'EventInput(label=' + Kotlin.toString(this.label) + (', date=' + Kotlin.toString(this.date)) + (', image=' + Kotlin.toString(this.image)) + ')';
  };
  EventInput.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.label) | 0;
    result = result * 31 + Kotlin.hashCode(this.date) | 0;
    result = result * 31 + Kotlin.hashCode(this.image) | 0;
    return result;
  };
  EventInput.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.label, other.label) && Kotlin.equals(this.date, other.date) && Kotlin.equals(this.image, other.image)))));
  };
  function Event(id, label, time, date, image) {
    if (id === void 0)
      id = undefined;
    this.id = id;
    this.label = label;
    this.time = time;
    this.date = date;
    this.image = image;
  }
  Event.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Event',
    interfaces: []
  };
  Event.prototype.component1 = function () {
    return this.id;
  };
  Event.prototype.component2 = function () {
    return this.label;
  };
  Event.prototype.component3 = function () {
    return this.time;
  };
  Event.prototype.component4 = function () {
    return this.date;
  };
  Event.prototype.component5 = function () {
    return this.image;
  };
  Event.prototype.copy_au0urb$ = function (id, label, time, date, image) {
    return new Event(id === void 0 ? this.id : id, label === void 0 ? this.label : label, time === void 0 ? this.time : time, date === void 0 ? this.date : date, image === void 0 ? this.image : image);
  };
  Event.prototype.toString = function () {
    return 'Event(id=' + Kotlin.toString(this.id) + (', label=' + Kotlin.toString(this.label)) + (', time=' + Kotlin.toString(this.time)) + (', date=' + Kotlin.toString(this.date)) + (', image=' + Kotlin.toString(this.image)) + ')';
  };
  Event.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.id) | 0;
    result = result * 31 + Kotlin.hashCode(this.label) | 0;
    result = result * 31 + Kotlin.hashCode(this.time) | 0;
    result = result * 31 + Kotlin.hashCode(this.date) | 0;
    result = result * 31 + Kotlin.hashCode(this.image) | 0;
    return result;
  };
  Event.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.id, other.id) && Kotlin.equals(this.label, other.label) && Kotlin.equals(this.time, other.time) && Kotlin.equals(this.date, other.date) && Kotlin.equals(this.image, other.image)))));
  };
  function Params(id) {
    if (id === void 0)
      id = undefined;
    this.id = id;
  }
  Params.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Params',
    interfaces: []
  };
  Params.prototype.component1 = function () {
    return this.id;
  };
  Params.prototype.copy_pdl1vj$ = function (id) {
    return new Params(id === void 0 ? this.id : id);
  };
  Params.prototype.toString = function () {
    return 'Params(id=' + Kotlin.toString(this.id) + ')';
  };
  Params.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.id) | 0;
    return result;
  };
  Params.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && Kotlin.equals(this.id, other.id))));
  };
  function Message(msg) {
    this.msg = msg;
  }
  Message.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Message',
    interfaces: []
  };
  Message.prototype.component1 = function () {
    return this.msg;
  };
  Message.prototype.copy_61zpoe$ = function (msg) {
    return new Message(msg === void 0 ? this.msg : msg);
  };
  Message.prototype.toString = function () {
    return 'Message(msg=' + Kotlin.toString(this.msg) + ')';
  };
  Message.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.msg) | 0;
    return result;
  };
  Message.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && Kotlin.equals(this.msg, other.msg))));
  };
  function Config(type, project_id, private_key_id, private_key, client_id, client_email, auth_uri, token_uri, auth_provider_x509_cert_url, client_x509_cert_url) {
    this.type = type;
    this.project_id = project_id;
    this.private_key_id = private_key_id;
    this.private_key = private_key;
    this.client_id = client_id;
    this.client_email = client_email;
    this.auth_uri = auth_uri;
    this.token_uri = token_uri;
    this.auth_provider_x509_cert_url = auth_provider_x509_cert_url;
    this.client_x509_cert_url = client_x509_cert_url;
  }
  Config.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Config',
    interfaces: []
  };
  Config.prototype.component1 = function () {
    return this.type;
  };
  Config.prototype.component2 = function () {
    return this.project_id;
  };
  Config.prototype.component3 = function () {
    return this.private_key_id;
  };
  Config.prototype.component4 = function () {
    return this.private_key;
  };
  Config.prototype.component5 = function () {
    return this.client_id;
  };
  Config.prototype.component6 = function () {
    return this.client_email;
  };
  Config.prototype.component7 = function () {
    return this.auth_uri;
  };
  Config.prototype.component8 = function () {
    return this.token_uri;
  };
  Config.prototype.component9 = function () {
    return this.auth_provider_x509_cert_url;
  };
  Config.prototype.component10 = function () {
    return this.client_x509_cert_url;
  };
  Config.prototype.copy_cvx4o0$ = function (type, project_id, private_key_id, private_key, client_id, client_email, auth_uri, token_uri, auth_provider_x509_cert_url, client_x509_cert_url) {
    return new Config(type === void 0 ? this.type : type, project_id === void 0 ? this.project_id : project_id, private_key_id === void 0 ? this.private_key_id : private_key_id, private_key === void 0 ? this.private_key : private_key, client_id === void 0 ? this.client_id : client_id, client_email === void 0 ? this.client_email : client_email, auth_uri === void 0 ? this.auth_uri : auth_uri, token_uri === void 0 ? this.token_uri : token_uri, auth_provider_x509_cert_url === void 0 ? this.auth_provider_x509_cert_url : auth_provider_x509_cert_url, client_x509_cert_url === void 0 ? this.client_x509_cert_url : client_x509_cert_url);
  };
  Config.prototype.toString = function () {
    return 'Config(type=' + Kotlin.toString(this.type) + (', project_id=' + Kotlin.toString(this.project_id)) + (', private_key_id=' + Kotlin.toString(this.private_key_id)) + (', private_key=' + Kotlin.toString(this.private_key)) + (', client_id=' + Kotlin.toString(this.client_id)) + (', client_email=' + Kotlin.toString(this.client_email)) + (', auth_uri=' + Kotlin.toString(this.auth_uri)) + (', token_uri=' + Kotlin.toString(this.token_uri)) + (', auth_provider_x509_cert_url=' + Kotlin.toString(this.auth_provider_x509_cert_url)) + (', client_x509_cert_url=' + Kotlin.toString(this.client_x509_cert_url)) + ')';
  };
  Config.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.type) | 0;
    result = result * 31 + Kotlin.hashCode(this.project_id) | 0;
    result = result * 31 + Kotlin.hashCode(this.private_key_id) | 0;
    result = result * 31 + Kotlin.hashCode(this.private_key) | 0;
    result = result * 31 + Kotlin.hashCode(this.client_id) | 0;
    result = result * 31 + Kotlin.hashCode(this.client_email) | 0;
    result = result * 31 + Kotlin.hashCode(this.auth_uri) | 0;
    result = result * 31 + Kotlin.hashCode(this.token_uri) | 0;
    result = result * 31 + Kotlin.hashCode(this.auth_provider_x509_cert_url) | 0;
    result = result * 31 + Kotlin.hashCode(this.client_x509_cert_url) | 0;
    return result;
  };
  Config.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.type, other.type) && Kotlin.equals(this.project_id, other.project_id) && Kotlin.equals(this.private_key_id, other.private_key_id) && Kotlin.equals(this.private_key, other.private_key) && Kotlin.equals(this.client_id, other.client_id) && Kotlin.equals(this.client_email, other.client_email) && Kotlin.equals(this.auth_uri, other.auth_uri) && Kotlin.equals(this.token_uri, other.token_uri) && Kotlin.equals(this.auth_provider_x509_cert_url, other.auth_provider_x509_cert_url) && Kotlin.equals(this.client_x509_cert_url, other.client_x509_cert_url)))));
  };
  function FirebaseAppOptions(credential, databaseAuthVariableOverride, databaseURL, storageBucket, projectId) {
    if (credential === void 0)
      credential = undefined;
    if (databaseAuthVariableOverride === void 0)
      databaseAuthVariableOverride = undefined;
    if (databaseURL === void 0)
      databaseURL = undefined;
    if (storageBucket === void 0)
      storageBucket = undefined;
    if (projectId === void 0)
      projectId = undefined;
    this.credential = credential;
    this.databaseAuthVariableOverride = databaseAuthVariableOverride;
    this.databaseURL = databaseURL;
    this.storageBucket = storageBucket;
    this.projectId = projectId;
  }
  FirebaseAppOptions.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'FirebaseAppOptions',
    interfaces: []
  };
  FirebaseAppOptions.prototype.component1 = function () {
    return this.credential;
  };
  FirebaseAppOptions.prototype.component2 = function () {
    return this.databaseAuthVariableOverride;
  };
  FirebaseAppOptions.prototype.component3 = function () {
    return this.databaseURL;
  };
  FirebaseAppOptions.prototype.component4 = function () {
    return this.storageBucket;
  };
  FirebaseAppOptions.prototype.component5 = function () {
    return this.projectId;
  };
  FirebaseAppOptions.prototype.copy_o0npqe$ = function (credential, databaseAuthVariableOverride, databaseURL, storageBucket, projectId) {
    return new FirebaseAppOptions(credential === void 0 ? this.credential : credential, databaseAuthVariableOverride === void 0 ? this.databaseAuthVariableOverride : databaseAuthVariableOverride, databaseURL === void 0 ? this.databaseURL : databaseURL, storageBucket === void 0 ? this.storageBucket : storageBucket, projectId === void 0 ? this.projectId : projectId);
  };
  FirebaseAppOptions.prototype.toString = function () {
    return 'FirebaseAppOptions(credential=' + Kotlin.toString(this.credential) + (', databaseAuthVariableOverride=' + Kotlin.toString(this.databaseAuthVariableOverride)) + (', databaseURL=' + Kotlin.toString(this.databaseURL)) + (', storageBucket=' + Kotlin.toString(this.storageBucket)) + (', projectId=' + Kotlin.toString(this.projectId)) + ')';
  };
  FirebaseAppOptions.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.credential) | 0;
    result = result * 31 + Kotlin.hashCode(this.databaseAuthVariableOverride) | 0;
    result = result * 31 + Kotlin.hashCode(this.databaseURL) | 0;
    result = result * 31 + Kotlin.hashCode(this.storageBucket) | 0;
    result = result * 31 + Kotlin.hashCode(this.projectId) | 0;
    return result;
  };
  FirebaseAppOptions.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.credential, other.credential) && Kotlin.equals(this.databaseAuthVariableOverride, other.databaseAuthVariableOverride) && Kotlin.equals(this.databaseURL, other.databaseURL) && Kotlin.equals(this.storageBucket, other.storageBucket) && Kotlin.equals(this.projectId, other.projectId)))));
  };
  var get = defineInlineFunction('index.com.firebase.wrappers.admin.firestore.get_tt04a2$', function ($receiver, field) {
    return $receiver[field];
  });
  var set = defineInlineFunction('index.com.firebase.wrappers.admin.firestore.set_pywg9r$', function ($receiver, field, value) {
    $receiver[field] = value;
  });
  function BucketFileOptions(generation) {
    if (generation === void 0)
      generation = undefined;
    this.generation = generation;
  }
  BucketFileOptions.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'BucketFileOptions',
    interfaces: []
  };
  BucketFileOptions.prototype.component1 = function () {
    return this.generation;
  };
  BucketFileOptions.prototype.copy_pdl1vj$ = function (generation) {
    return new BucketFileOptions(generation === void 0 ? this.generation : generation);
  };
  BucketFileOptions.prototype.toString = function () {
    return 'BucketFileOptions(generation=' + Kotlin.toString(this.generation) + ')';
  };
  BucketFileOptions.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.generation) | 0;
    return result;
  };
  BucketFileOptions.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && Kotlin.equals(this.generation, other.generation))));
  };
  function WriteStreamOptions(gzip, metadata, offset, predefinedAct, private_0, public_0, resumable, uri, validation) {
    if (gzip === void 0)
      gzip = null;
    if (metadata === void 0)
      metadata = null;
    if (offset === void 0)
      offset = null;
    if (predefinedAct === void 0)
      predefinedAct = null;
    if (private_0 === void 0)
      private_0 = null;
    if (public_0 === void 0)
      public_0 = null;
    if (resumable === void 0)
      resumable = null;
    if (uri === void 0)
      uri = null;
    if (validation === void 0)
      validation = null;
    this.gzip = gzip;
    this.metadata = metadata;
    this.offset = offset;
    this.predefinedAct = predefinedAct;
    this.private = private_0;
    this.public = public_0;
    this.resumable = resumable;
    this.uri = uri;
    this.validation = validation;
  }
  WriteStreamOptions.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'WriteStreamOptions',
    interfaces: []
  };
  WriteStreamOptions.prototype.component1 = function () {
    return this.gzip;
  };
  WriteStreamOptions.prototype.component2 = function () {
    return this.metadata;
  };
  WriteStreamOptions.prototype.component3 = function () {
    return this.offset;
  };
  WriteStreamOptions.prototype.component4 = function () {
    return this.predefinedAct;
  };
  WriteStreamOptions.prototype.component5 = function () {
    return this.private;
  };
  WriteStreamOptions.prototype.component6 = function () {
    return this.public;
  };
  WriteStreamOptions.prototype.component7 = function () {
    return this.resumable;
  };
  WriteStreamOptions.prototype.component8 = function () {
    return this.uri;
  };
  WriteStreamOptions.prototype.component9 = function () {
    return this.validation;
  };
  WriteStreamOptions.prototype.copy_jiahnr$ = function (gzip, metadata, offset, predefinedAct, private_0, public_0, resumable, uri, validation) {
    return new WriteStreamOptions(gzip === void 0 ? this.gzip : gzip, metadata === void 0 ? this.metadata : metadata, offset === void 0 ? this.offset : offset, predefinedAct === void 0 ? this.predefinedAct : predefinedAct, private_0 === void 0 ? this.private : private_0, public_0 === void 0 ? this.public : public_0, resumable === void 0 ? this.resumable : resumable, uri === void 0 ? this.uri : uri, validation === void 0 ? this.validation : validation);
  };
  WriteStreamOptions.prototype.toString = function () {
    return 'WriteStreamOptions(gzip=' + Kotlin.toString(this.gzip) + (', metadata=' + Kotlin.toString(this.metadata)) + (', offset=' + Kotlin.toString(this.offset)) + (', predefinedAct=' + Kotlin.toString(this.predefinedAct)) + (', private=' + Kotlin.toString(this.private)) + (', public=' + Kotlin.toString(this.public)) + (', resumable=' + Kotlin.toString(this.resumable)) + (', uri=' + Kotlin.toString(this.uri)) + (', validation=' + Kotlin.toString(this.validation)) + ')';
  };
  WriteStreamOptions.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.gzip) | 0;
    result = result * 31 + Kotlin.hashCode(this.metadata) | 0;
    result = result * 31 + Kotlin.hashCode(this.offset) | 0;
    result = result * 31 + Kotlin.hashCode(this.predefinedAct) | 0;
    result = result * 31 + Kotlin.hashCode(this.private) | 0;
    result = result * 31 + Kotlin.hashCode(this.public) | 0;
    result = result * 31 + Kotlin.hashCode(this.resumable) | 0;
    result = result * 31 + Kotlin.hashCode(this.uri) | 0;
    result = result * 31 + Kotlin.hashCode(this.validation) | 0;
    return result;
  };
  WriteStreamOptions.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.gzip, other.gzip) && Kotlin.equals(this.metadata, other.metadata) && Kotlin.equals(this.offset, other.offset) && Kotlin.equals(this.predefinedAct, other.predefinedAct) && Kotlin.equals(this.private, other.private) && Kotlin.equals(this.public, other.public) && Kotlin.equals(this.resumable, other.resumable) && Kotlin.equals(this.uri, other.uri) && Kotlin.equals(this.validation, other.validation)))));
  };
  function FileMetaData(contentType, metadata, cacheControl) {
    if (contentType === void 0)
      contentType = null;
    if (metadata === void 0)
      metadata = null;
    if (cacheControl === void 0)
      cacheControl = null;
    this.contentType = contentType;
    this.metadata = metadata;
    this.cacheControl = cacheControl;
  }
  FileMetaData.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'FileMetaData',
    interfaces: []
  };
  FileMetaData.prototype.component1 = function () {
    return this.contentType;
  };
  FileMetaData.prototype.component2 = function () {
    return this.metadata;
  };
  FileMetaData.prototype.component3 = function () {
    return this.cacheControl;
  };
  FileMetaData.prototype.copy_zhtotu$ = function (contentType, metadata, cacheControl) {
    return new FileMetaData(contentType === void 0 ? this.contentType : contentType, metadata === void 0 ? this.metadata : metadata, cacheControl === void 0 ? this.cacheControl : cacheControl);
  };
  FileMetaData.prototype.toString = function () {
    return 'FileMetaData(contentType=' + Kotlin.toString(this.contentType) + (', metadata=' + Kotlin.toString(this.metadata)) + (', cacheControl=' + Kotlin.toString(this.cacheControl)) + ')';
  };
  FileMetaData.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.contentType) | 0;
    result = result * 31 + Kotlin.hashCode(this.metadata) | 0;
    result = result * 31 + Kotlin.hashCode(this.cacheControl) | 0;
    return result;
  };
  FileMetaData.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.contentType, other.contentType) && Kotlin.equals(this.metadata, other.metadata) && Kotlin.equals(this.cacheControl, other.cacheControl)))));
  };
  var package$com = _.com || (_.com = {});
  var package$api = package$com.api || (package$com.api = {});
  var package$event = package$api.event || (package$api.event = {});
  package$event.main_kand9s$ = main;
  package$event.EventInput = EventInput;
  package$event.Event = Event;
  package$event.Params = Params;
  package$event.Message = Message;
  var package$firebase = package$com.firebase || (package$com.firebase = {});
  var package$wrappers = package$firebase.wrappers || (package$firebase.wrappers = {});
  var package$admin = package$wrappers.admin || (package$wrappers.admin = {});
  package$admin.Config = Config;
  package$admin.FirebaseAppOptions = FirebaseAppOptions;
  var package$firestore = package$admin.firestore || (package$admin.firestore = {});
  package$firestore.get_tt04a2$ = get;
  package$firestore.set_pywg9r$ = set;
  var package$storage = package$admin.storage || (package$admin.storage = {});
  package$storage.BucketFileOptions = BucketFileOptions;
  package$storage.WriteStreamOptions = WriteStreamOptions;
  package$storage.FileMetaData = FileMetaData;
  main([]);
  Kotlin.defineModule('index', _);
  return _;
}(module.exports, require('kotlin'), require('express'), require('cors'), require('firebase-admin'), require('firebase-functions')));

//# sourceMappingURL=index.js.map
