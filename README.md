# Flutter TDS Permission

An unified permission for Android & iOS. 

current version :

1.0.0

minimum requirement :

- Flutter vx.x.x
- Android API 19+
- iOS 16

# Setup

```bash
flutter pub add tds_permission
```

- Android
    
    ```json
    
    ```
    
- iOS
    
    ```json
    
    ```
    

# How To Use

---

### Available Permission

```dart
enum TDSPermission {
	location,
	notification,
	camera,
	bluetooth,
	storage,
	contact,
	media,
	audio
}
```

### Get Status

with .status, you can get status permission. that available status is `.isAvailable` ,`.isDenied` ,`.isReject` , `.etc`

```dart
var status = await TDSPermission("iOS", .notification).status()

if (status[.location] == .isAvailable) {
	//todo: handle if permission is available
}
```

### Request Permission

```dart
TDSPermission("iOS", .camera).request({ (status) {
	if (status == .isAvailable) {
		//todo: handle if permission is available
	}
	}
})
```

# Example

```json

```
