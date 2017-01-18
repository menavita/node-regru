'use strict'

var request = require("request");
var Q = require("q");

function RegRU (username,password) {
  
  this.username = username;
  this.password = password;

}

RegRU.prototype.check = function(dname){

	var d = Q.defer();
	var input_data = {};

	if ( typeof(dname) == 'string') {

		input_data['domain_name'] = dname;
	
	}
	else 
	{

		input_data['domains'] = [];
		dname.forEach(function(el) { 
			input_data['domains'].push({"domain_name": el});
		});

	}

	var form = {
		input_format: "json",
		output_format: "json",
		io_encoding: "utf8",
		input_data: JSON.stringify(input_data),
		show_input_params: 0,
		username: this.username,
		password: this.password
	};

	request.post("https://api.reg.ru/api/regru2/domain/check",
		{form:form}, function(error,res,body) {
			if(error){ d.reject(error);}
			d.resolve(body);
		}
	);

	return d.promise;
}

RegRU.prototype.create = function(domain, data, period, nss, org){

	var contacts = {};
	var d = Q.defer();

	if(domain.indexOf('.ru')|| domain.indexOf('.su')){
		period = 1;
	}

	var domainzone = {

		0: [ '.ru', '.su', '.рф'],
		1: [ '.ru.net', '.com.ru', '.exnet.su'],
		2: [ '.москва', '.moscow', '.дети', '.tatar'],
		3: [ '.com', '.net', '.org', '.biz', '.name', '.info', '.mobi', '.uk', '.cc', 
			 '.tv', '.ws', '.bz', '.me', '.us', '.pro', '.lv', '.ro', '.site', 
			 '.rest','.academy', '.accountant', '.accountants', '.actor', 
			 '.adult', '.aero', '.agency', '.airforce', '.apartments', '.associates', 
			 '.attorney', '.auction', '.audio', '.auto', '.band', '.bar', '.bargains', 
			 '.beer', '.best', '.bet', '.bid', '.bike', '.bingo', '.black', '.blackfriday', 
			 '.blog', '.blue','.boutique', '.broker', '.build', '.builders', '.business', 
			 '.buzz', '.bzh', '.cab', '.cafe', '.cam', '.camera', '.camp', '.capital', 
			 '.car', '.cards', '.care', '.career', '.careers', '.cars', '.casa', '.cash', 
			 '.casino', '.cat', '.catering','.center', '.chat', '.cheap', '.christmas', 
			 '.church', '.city', '.claims', '.cleaning', '.click', '.clinic','.clothing', 
			 '.cloud', '.club', '.coach', '.codes', '.coffee', '.college', '.community', 
			 '.company', '.computer','.condos', '.construction', '.consulting', '.contractors', 
			 '.cooking', '.cool', '.country', '.coupons', '.courses','.credit', '.creditcard', 
			 '.cricket', '.cruises', '.dance', '.date', '.dating', '.deals', '.degree', 
			 '.delivery', '.democrat','.dental', '.dentist', '.desi', '.design', '.diamonds', 
			 '.diet', '.digital', '.direct', '.directory', '.discount', '.dog', '.domains', 
			 '.download','.earth', '.education', '.email', '.energy', '.engineer', 
			 '.engineering', '.enterprises', '.equipment', '.estate', '.eus', '.events', 
			 '.exchange','.exnet.su', '.expert', '.exposed', '.express', '.fail', '.faith', 
			 '.family', '.fans', '.farm', '.fashion', '.feedback', '.film', '.finance', 
			 '.financial', '.fish', '.fishing', '.fit', '.fitness', '.flights', '.florist', 
			 '.flowers', '.fm', '.football', '.forex', '.forsale','.foundation', '.frl', 
			 '.fund', '.furniture', '.futbol', '.fyi', '.gallery', '.game', '.games', 
			 '.garden', '.gent', '.gift', '.gifts', '.gives','.glass', '.global', '.gmbh', 
			 '.gold', '.golf', '.graphics', '.gratis', '.green', '.gripe', '.group', 
			 '.guide', '.guitars', '.guru','.haus', '.healthcare', '.help', '.hiphop', 
			 '.hiv', '.hockey', '.holdings', '.holiday', '.horse', '.host', '.hosting', 
			 '.house', '.how','.immo', '.immobilien', '.industries', '.ink', '.institute', 
			 '.insure', '.international', '.investments', '.jetzt', '.jewelery', '.jobs', 
			 '.juegos','.kaufen', '.kim', '.kitchen', '.kiwi', '.land', '.lawyer', 
			 '.lease', '.legal', '.lgbt', '.life','.lighting', '.limited', '.limo', 
			 '.link', '.live', '.loan','.loans', '.lol', '.love', '.ltd', '.ltda', 
			 '.luxury', '.maison', '.management', '.market', '.marketing', '.markets', 
			 '.mba', '.media', '.memorial', '.men', '.menu', '.mobi', '.moda','.moe', 
			 '.mom', '.money', '.movie', '.network', '.ninja', '.one', '.onl', '.online', 
			 '.ooo', '.partners', '.parts', '.party', '.pet', '.photo', '.photography', 
			 '.photos', '.physio', '.pics','.pictures', '.pink', '.pizza', '.place', 
			 '.plumbing', '.plus', '.poker', '.porn', '.press', '.pro', '.productions', 
			 '.promo', '.properties', '.property', '.protection', '.pub','.qpon', 
			 '.radio.am', '.radio.fm', '.racing', '.recipes', '.red', '.rehab', '.reisen', 
			 '.rent', '.rentals', '.repair', '.report', '.rest', '.restaurant', '.reviews', 
			 '.rip','.rocks', '.rodeo', '.run', '.sale', '.salon', '.sarl', '.school', 
			 '.schule', '.science', '.security', '.services', '.sex', '.sexy', '.shiksha', 
			 '.shoes', '.shop', '.shopping', '.show', '.singles', '.site', '.ski', '.soccer', 
			 '.social', '.software', '.solar', '.solutions', '.soy', '.space', '.store', 
			 '.stream', '.studio', '.study', '.sucks', '.supplies', '.supply', '.support', 
			 '.surf', '.surgery', '.systems', '.tattoo', '.tax', '.taxi', '.team', '.tech', 
			 '.technology', '.tel', '.tennis', '.theater', '.theatre', '.tienda', '.tips', 
			 '.tires', '.today', '.tools', '.top', '.tours', '.town', '.toys', '.trade', 
			 '.trading', '.training', '.travel', '.tube', '.tv', '.university', '.uno', 
			 '.vacations', '.ventures', '.vet', '.viajes', '.video', '.villas', '.vin', 
			 '.vip', '.vision', '.vodka', '.vote', '.voto', '.voyage', '.wang', '.watch', 
			 '.webcam', '.website', '.wedding', '.whoswho', '.wiki', '.win', '.wine', 
			 '.work', '.works', '.world', '.wtf', '.xxx', '.xyz', '.yoga', '.zone']
	
	};

	var premiumdomain = ['.actor', '.airforce', '.band', '.bike', '.build', '.cam', 
						 '.career', '.casa', '.center', '.click', '.clinic', '.cloud', 
						 '.club', '.codes', '.consulting', '.country', '.courses', 
						 '.dance', '.degree', '.dentist', '.diamonds', '.digital', 
						 '.directory', '.email', '.engineer', '.equipment', '.exchange', 
						 '.expert','.family','.fashion','.film','.fishing','.fit',
						 '.forsale','.fui','.game','.garden','.glass','.gratis',
						 '.gripe','.horse','.jewelery','.life','.limited','.live',
						 '.love','.ltda','.management','.market','.network',
						 '.ninja','.one','.photos','.productions','.rehab','.report'
						 ,'.reviews','.rip','.zone','.work','.whoswho','.wedding',
						 '.vodka','.video','.vet','.training','.tips','.technology',
						 '.surf','.support','.supplies','.study','.studio','.solutions',
						 '.software','.social','.ski','.sale','.rodeo'];

	if(domainzone[0].indexOf(domain.substr(domain.indexOf("."))) != -1){// define domain zone
		
		contacts = {
			sms_security_number: data.sms_security_number,
			p_addr: data.p_addr,
			phone: data.phone,
			e_mail: data.e_mail
		};

		if(org){

			contacts.org = data.org;
			contacts.org_r = data.org_r;
			contacts.code = data.code;
			contacts.country = data.country;
			contacts.address_r = data.address_r;
		
		}
		else {

			contacts.person = data.person;
			contacts.person_r = data.person_r;
			contacts.passport = data.passport;
			contacts.birth_date = data.birth_date;
			contacts.country = data.country;
		
		}
	
	}
	else if( domainzone[1].indexOf(domain.substr(domain.indexOf("."))) != -1){

		if(org){

			contacts = {
				o_first_name: data.o_first_name,
				o_first_name_ru: data.o_first_name_ru,
				o_last_name: data.o_last_name,
				o_last_name_ru: data.o_last_name_ru,
				o_patronimic: data.o_patronimic,
				o_patronimic_ru: data.o_patronimic_ru,
				o_city: data.o_city,
				o_city_ru: data.o_city_ru,
				o_addr: data.o_addr,
				o_addr_ru: data.o_addr_ru,
				o_state: data.o_state,
				o_state_ru: data.o_state_ru,
				o_phone: data.o_phone,
				o_email: data.o_email,
				o_postcode: data.o_postcode,
				o_country_code: data.o_country_code,
				o_code: data.o_code,
				o_company: data.o_company,
				o_company_ru: data.o_company_ru,
				o_l_addr: data.o_l_addr,
				o_l_addr_ru: data.o_l_addr_ru,
				o_l_city: data.o_l_city,
				o_l_city_ru: data.o_l_city_ru,
				o_l_postcode: data.o_l_postcode,
				o_l_state: data.o_l_state,
				o_l_state_ru: data.o_l_state_ru
			};
			
		}
		else{

			contacts = {
				o_first_name: data.o_first_name,
				o_first_name_ru: data.o_first_name_ru,
				o_last_name: data.o_last_name,
				o_last_name_ru: data.o_last_name_ru,
				o_patronimic: data.o_patronimic,
				o_patronimic_ru: data.o_patronimic_ru,
				o_city: data.o_city,
				o_city_ru: data.o_city_ru,
				o_addr: data.o_addr,
				o_addr_ru: data.o_addr_ru,
				o_state: data.o_state,
				o_state_ru: data.o_state_ru,
				o_phone: data.o_phone,
				o_email: data.o_email,
				o_postcode: data.o_postcode,
				o_country_code: data.o_country_code,
				o_code: data.o_code,
				o_birth_date: data.o_birth_date,
				o_passport_date: data.o_passport_date,
				o_passport_number: data.o_passport_number,
				o_passport_place: data.o_passport_place
			};

		}

	}
	else if( domainzone[2].indexOf(domain.substr(domain.indexOf("."))) != -1){

		if(org){

			contacts = {
				o_first_name: data.o_first_name,
				o_first_name_ru: data.o_first_name_ru,
				o_last_name: data.o_last_name,
				o_last_name_ru: data.o_last_name_ru,
				o_patronimic: data.o_patronimic,
				o_patronimic_ru: data.o_patronimic_ru,
				o_city: data.o_city,
				o_city_ru: data.o_city_ru,
				o_addr: data.o_addr,
				o_addr_ru: data.o_addr_ru,
				o_state: data.o_state,
				o_state_ru: data.o_state_ru,
				o_phone: data.o_phone,
				o_email: data.o_email,
				o_postcode: data.o_postcode,
				o_country_code: data.o_country_code,
				o_code: data.o_code,
				o_company: data.o_company,
				o_company_ru: data.o_company_ru,
				o_l_addr: data.o_l_addr,
				o_l_addr_ru: data.o_l_addr_ru,
				o_l_city: data.o_l_city,
				o_l_city_ru: data.o_l_city_ru,
				o_l_postcode: data.o_l_postcode,
				o_l_state: data.o_l_state,
				o_l_state_ru: data.o_l_state_ru,
				a_first_name: data.a_first_name,
				a_first_name_ru: data.a_first_name_ru,
				a_last_name: data.a_last_name,
				a_last_name_ru: data.a_last_name_ru,
				a_patronimic: data.a_patronimic,
				a_patronimic_ru: data.a_patronimic_ru,
				a_city: data.a_city,
				a_city_ru: data.a_city_ru,
				a_addr: data.a_addr,
				a_addr_ru: data.a_addr_ru,
				a_state: data.a_state,
				a_state_ru: data.a_state_ru,
				a_phone: data.a_phone,
				a_email: data.a_email,
				a_postcode: data.a_postcode,
				a_country_code: data.a_country_code,
				a_code: data.a_code,
				a_company: data.a_company,
				a_company_ru: data.a_company_ru,
				a_l_addr: data.a_l_addr,
				a_l_addr_ru: data.a_l_addr_ru,
				a_l_city: data.a_l_city,
				a_l_city_ru: data.a_l_city_ru,
				a_l_postcode: data.a_l_postcode,
				a_l_state: data.a_l_state,
				a_l_state_ru: data.a_l_state_ru,
				t_first_name: data.t_first_name,
				t_first_name_ru: data.t_first_name_ru,
				t_last_name: data.t_last_name,
				t_last_name_ru: data.t_last_name_ru,
				t_patronimic: data.t_patronimic,
				t_patronimic_ru: data.t_patronimic_ru,
				t_city: data.t_city,
				t_city_ru: data.t_city_ru,
				t_addr: data.t_addr,
				t_addr_ru: data.t_addr_ru,
				t_state: data.t_state,
				t_state_ru: data.t_state_ru,
				t_phone: data.t_phone,
				t_email: data.t_email,
				t_postcode: data.t_postcode,
				t_country_code: data.t_country_code,
				t_code: data.t_code,
				t_company: data.t_company,
				t_company_ru: data.t_company_ru,
				t_l_addr: data.t_l_addr,
				t_l_addr_ru: data.t_l_addr_ru,
				t_l_city: data.t_l_city,
				t_l_city_ru: data.t_l_city_ru,
				t_l_postcode: data.t_l_postcode,
				t_l_state: data.t_l_state,
				t_l_state_ru: data.t_l_state_ru
			};

		}
		else{

			contacts = {
				o_first_name: data.o_first_name,
				o_first_name_ru: data.o_first_name_ru,
				o_last_name: data.o_last_name,
				o_last_name_ru: data.o_last_name_ru,
				o_patronimic: data.o_patronimic,
				o_patronimic_ru: data.o_patronimic_ru,
				o_city: data.o_city,
				o_city_ru: data.o_city_ru,
				o_addr: data.o_addr,
				o_addr_ru: data.o_addr_ru,
				o_state: data.o_state,
				o_state_ru: data.o_state_ru,
				o_phone: data.o_phone,
				o_email: data.o_email,
				o_postcode: data.o_postcode,
				o_country_code: data.o_country_code,
				//o_code: data.o_code,
				o_birth_date: data.o_birth_date,
				o_passport_date: data.o_passport_date,
				o_passport_number: data.o_passport_number,
				o_passport_place: data.o_passport_place,
				a_first_name: data.a_first_name,
				a_first_name_ru: data.a_first_name_ru,
				a_last_name: data.a_last_name,
				a_last_name_ru: data.a_last_name_ru,
				a_patronimic: data.a_patronimic,
				a_patronimic_ru: data.a_patronimic_ru,
				a_city: data.a_city,
				a_city_ru: data.a_city_ru,
				a_addr: data.a_addr,
				a_addr_ru: data.a_addr_ru,
				a_state: data.a_state,
				a_state_ru: data.a_state_ru,
				a_phone: data.a_phone,
				a_email: data.a_email,
				a_postcode: data.a_postcode,
				a_country_code: data.a_country_code,
				a_birth_date: data.a_birth_date,
				a_passport_date: data.a_passport_date,
				a_passport_number: data.a_passport_number,
				a_passport_place: data.a_passport_place,
				a_code: data.a_code,
				t_first_name: data.t_first_name,
				t_first_name_ru: data.t_first_name_ru,
				t_last_name: data.t_last_name,
				t_last_name_ru: data.t_last_name_ru,
				t_patronimic: data.t_patronimic,
				t_patronimic_ru: data.t_patronimic_ru,
				t_city: data.t_city,
				t_city_ru: data.t_city_ru,
				t_addr: data.t_addr,
				t_addr_ru: data.t_addr_ru,
				t_state: data.t_state,
				t_state_ru: data.t_state_ru,
				t_phone: data.t_phone,
				t_email: data.t_email,
				t_postcode: data.t_postcode,
				t_country_code: data.t_country_code,
				t_birth_date: data.t_birth_date,
				t_passport_date: data.t_passport_date,
				t_passport_number: data.t_passport_number,
				t_passport_place: data.t_passport_place,
				t_code: data.t_code
			};
	
		}
		
	}
	else if( domainzone[3].indexOf(domain.substr(domain.indexOf("."))) != -1){// define domain zone 
		
		contacts = {
			o_company: data.o_company,
			o_first_name: data.o_first_name,
			o_last_name: data.o_last_name,
			o_email: data.o_email,
			o_phone: data.o_phone,
			o_addr: data.o_addr,
			o_city: data.o_city,
			o_state: data.o_state,
			o_postcode: data.o_postcode,
			o_country_code: data.o_country_code,
			a_company: data.a_company,
			a_first_name: data.a_first_name,
			a_last_name: data.a_last_name,
			a_email: data.a_email,
			a_phone: data.a_phone,
			a_addr: data.a_addr,
			a_city: data.a_city,
			a_state: data.a_state,
			a_postcode: data.a_postcode,
			a_country_code: data.a_country_code,
			t_company: data.t_company,
			t_first_name: data.t_first_name,
			t_last_name: data.t_last_name,
			t_email: data.t_email,
			t_phone: data.t_phone,
			t_addr: data.t_addr,
			t_city: data.t_city,
			t_state: data.t_state,
			t_postcode: data.t_postcode,
			t_country_code: data.t_country_code,
			b_company: data.b_company,
			b_first_name: data.b_first_name,
			b_last_name: data.b_last_name,
			b_email: data.b_email,
			b_phone: data.b_phone,
			b_addr: data.b_addr,
			b_city: data.b_city,
			b_state: data.b_state,
			b_postcode: data.b_postcode,
			b_country_code: data.b_country_code,
		};

		// add additional data dor domains
		if(domain.indexOf(".com") != -1){
		
			contacts.private_person_flag = data.private_person_flag;
		
		}

		if(domain.indexOf(".us") != -1){

			contacts.RselnexusAppPurpose = data.RselnexusAppPurpose; // P1...P5
			contacts.RselnexusCategory = data.RselnexusCategory;// C11, C12, C21, C31, C32

		}

		if(domain.indexOf(".pro") != -1){

			contacts.pro_profession = data.pro_profession;// Acupuncturists
		
		}

		if((domain.indexOf(".lv") != -1) || (domain.indexOf(".ro") != -1)){

			contacts.idnumber = data.idnumber;
			contacts.vaid = data.vatid;
			contacts.reistrant_type = contacts.registrant_type;// individual or organization

		}

		if(domain.indexOf(".travel") != -1){

			contacts.travel_uin = data.travel_uin;

		}

		if(domain.indexOf(".aero") != -1){

			contacts.aero_ens_id = data.aero_ens_id;
			contacts.aero_ens_p = data.aero_ens_p;

		}

		if((domain.indexOf(".attorney") != -1) || (domain.indexOf(".lawyer") != -1)){

			contacts.regulatorybody = data.regulatorybody;

		}

		if(domain.indexOf(".jobs") != -1){

			contacts.admin_type = data.admin_type;
			contacts.company_url = data.company_url;
			contacts.ind_classification = data.ind_classification;
			contacts.tax_id = data.tax_id;

		}

	}



	var form = {
		input_format: "json",
		username: this.username,
		password: this.password,
		show_input_params: 1,
		input_data: JSON.stringify({
			io_encoding: "utf8",
			output_format: "json",
			lang: "en",
			domain_name: domain,
			period: period,
			contacts: contacts,
			//reg_premium: (premiumdomain.indexOf(domain.substr(domain.indexOf("."))) != -1) ? 1 : 0, 
			nss:{
				ns1: nss[0],
				ns0: nss[1]
			}
		})
	};

	request.post("https://api.reg.ru/api/regru2/domain/create", { form:form }, function(error,res,body) {
			if(error){ d.reject(error);}
			d.resolve(body);
		}
	);

	return d.promise;

}

RegRU.prototype.getPrices = function(currency){

	var d = Q.defer();

	var form = {
		input_format: "json",
		output_format: "json",
		io_encoding: "utf8",
		username: this.username,
		password: this.password,
		currency: currency
	};

	request.post("https://api.reg.ru/api/regru2/domain/get_prices", 
	   {form: form}, function (error, res, body) {
	   		if(error){ d.reject(error); }
	   		d.resolve(body);
	   }
	);

	return d.promise;

}

RegRU.prototype.renew = function(domain, period){

	var d = Q.defer();
	
	var form = {
		input_format: "json",
		output_format: "json",
		io_encoding: "utf8",
		allow_create_bills: true,
		username: this.username,
		password: this.password,
		period: period,
		domain_name: domain,
		servtype: "domain"
	};

	request.post("https://api.reg.ru/api/regru2/service/renew", 
	   {form: form}, function (error, res, body) {
	   		if(error){ d.reject(error); }
	   		d.resolve(body);
	   }
	);

	return d.promise;

}

module.exports = RegRU;