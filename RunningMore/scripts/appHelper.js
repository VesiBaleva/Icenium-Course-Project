var appHelper = {
		resolveProfilePictureUrl: function (id) {
			if (id && id !== applicationSettings.emptyGuid) {
				return el.Files.getDownloadUrl(id);
			}
			else {
				return 'styles/images/avatar.png';
			}
		},
		resolvePictureUrl: function (id) {
			if (id && id !== applicationSettings.emptyGuid) {
				return el.Files.getDownloadUrl(id);
			}
			else {
				return '';
			}
		},
		formatDate: function (dateString) {
			var date = new Date(dateString);
			var year = date.getFullYear().toString();
			var month = date.getMonth().toString();
			var day = date.getDate().toString();
			return day + '.' + month + '.' + year;
		},
		logout: function () {
			return el.Users.logout();
		}
	};