{{#class}}
	singleton: true,
	alternateClassName: 'UploadeUtils',

	isTap: true,// 该字段用于区分list的长按或单击事件

	/*
		图片上传的方法,上传成功失败的方法自行处理
	*/
	uploadPic: function(webUrl, fileURI, userCode, onSuccess, onFail) {
		console.log('上传最底层方法');
		var options = new FileUploadOptions();
		options.fileKey = "userfile";
		var uploadName = userCode+"_"+(fileURI.substr(fileURI.lastIndexOf('/') + 1));
		options.fileName = uploadName;//设置图片在服务器上的名字
		options.mimeType = "image/jpeg";
		options.chunkedMode = false;
		var ft = new FileTransfer();
		var uploadUrl = webUrl+"/servlet/SINFileUpload?facecode=VisitImageUploadExecutor";//encodeURI(config.imgUp);
		ft.upload(fileURI, uploadUrl, onSuccess, onFail, options);
		uploadName = userCode+"/"+uploadName;
		return uploadName;
		// return userCode+"/"+userCode+"763493593.jpg"
	},

	/*
		拍照的方法, 拍摄成功失败的方法自行处理
	*/
	takePhoto: function(onSuccess, onFail, quality) {
		console.log('takePhote');
		navigator.camera.getPicture(onSuccess, onFail, { quality: quality||50,
		    destinationType: Camera.DestinationType.FILE_URI,
		    //correctOrientation: true,//自动调整照片（纵横）
		    //saveToPhotoAlbum: true,//将图片保存到相册
		    targetWidth: 600,
		    targetHeight: 800,
		 }); 
	},

	/*
		从本地选取图片,成功失败的方法自行处理
	*/
	selectPicture: function(onSuccess, onFaild) {
		console.log('selectPicture');
		navigator.camera.getPicture(
			onSuccess, onFaild, {
				quality: 100,
				destinationType: Camera.DestinationType.FILE_URI,
		        sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM,
		     	targetWidth: 600,
		    	targetHeight: 800,
		    	// saveToPhotoAlbum:true
		    }
		)
	},

	gotPhoto:function(imageUri) {
			var fileSize=0;
	    	window.resolveLocalFileSystemURI(imageUri, function(fileEntry) {
	        fileEntry.file(function(fileObj) {
	            console.log("Size = " + fileObj.size);
	            fileSize=fileObj.size;
	        });
	    });
	},

	//复制并重命名图片
	copyRenamePhoto:function(imageURI,newName,onCopySuccess) {
	    window.resolveLocalFileSystemURL(imageURI, copyPhoto, onCopyFail);
	    function copyPhoto(fileEntry) {
		    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSys) { 
		        fileSys.root.getDirectory("Android/data/com.eteng.mobile.BcpBoss/cache", {create: true, exclusive: false}, function(dir) { 
		                fileEntry.copyTo(dir, newName, onCopySuccess, onCopyFail); 
		            }, onCopyFail); 
		    }, onCopyFail); 
		}
		function onCopyFail(error) {
		    alert(error.code);
		}
	},

	/** 这个需要修改.........
	............................
	....................
	.....**/
	clearDirectory:function(){
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onFileSystemSuccess, fail);
        function fail(evt) {
            // alert("FILE SYSTEM FAILURE" + evt.target.error.code);
        }
        function onFileSystemSuccess(fileSystem) {
            fileSystem.root.getDirectory(
                 "Android/data/com.eteng.mobile.BcpBoss/cache",
                {create : true, exclusive : false},
                function(entry) {
                entry.removeRecursively(function() {
                    // alert("Remove Recursively Succeeded");
                }, fail);
            }, fail);
        }
    }

	//复制并重命名图片
	// copyRenamePhoto(imageURI,newName){
	// 	window.resolveLocalFileSystemURI(imageURI,
	// 		function(fileEntry) {
	// 		 	fileEntry.copyTo(dir, "file.jpg", 
	// 		 		function(entry) {
	// 		 			return entry.fullPath;
	// 				    elert(entry.fullPath);
	// 				}, 
	// 				function(error) {
	// 				    elert(error.code);
	// 				}
	// 			); 
	// 		}
	// 	, fail);
	// }

	// function createFileEntry(imageURI) {
	//     window.resolveLocalFileSystemURI(imageURI, copyPhoto, fail);    
	// }

	// function copyPhoto(fileEntry) {
	//     window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSys) { 
	//         fileSys.root.getDirectory("photos", {create: true, exclusive: false}, function(dir) { 
	//                 fileEntry.copyTo(dir, "file.jpg", onCopySuccess, fail); 
	//             }, fail); 
	//     }, fail); 
	// }

	// function onCopySuccess(entry) {
	//     console.log(entry.fullPath)
	// }

	// function fail(error) {
	//     console.log(error.code);
	// }

{{/class}}