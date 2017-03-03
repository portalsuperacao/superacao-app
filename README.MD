# Configurações iniciais
### 1. Configurar dados do firebase no aplicativo
O aplicativo utiliza como base de dados o Firebase e para isso é necessário criar uma conta neste link:
https://firebase.google.com/
Após isso pegue todos os dados de configurações no console do Firebase
Abra o seguinte arquivo:
```sh
$  superacao-app/app/app.module.ts
```

Utilize algum editor de texto de sua preferência e insira os dados do firebase na seguinte constante:

```typescript
export const firebaseConfig = {
   apiKey: "<YOUR DATAS>",
   authDomain: "<YOUR DATAS>",
   databaseURL: "<YOUR DATASL>",
   storageBucket: "<YOUR DATAS>",
   messagingSenderId: "<YOUR DATAS>"
};
```

### 2. Configurar autenticação com Facebook
Para realizar a autenticação com facebook, é necessário criar um aplicativo no Facebook developers (https://developers.facebook.com/). Após gerar um projeto, você ira precisar do ID e o nome do projeto.

Feito tudo isso, abra o arquivo
```sh
 superacao/config.xml
 ```

Altere os seguintes dados, com o ID e o nome do seu projeto:
```xml
<plugin name="cordova-plugin-facebook4" spec="~1.7.4">
    <variable name="APP_ID" value="<YOUR DATA>" />
    <variable name="APP_NAME" value="<YOUR DATA>" />
</plugin>
```

### 3. Configurar Push Notification
Para realizar os push notification no app, é necessário realizar uma pequena configuração. Para o serviço tambem utilizamos o FCM (Firebase Cloud Message), e para isso, você precisará do "Sender ID" da sua conta firebase (este dado você pode pegar no console do firebase). No mesmo arquivo XML altere os seguintes dados

```xml
<plugin name="phonegap-plugin-push" spec="~1.9.2">
    <variable name="SENDER_ID" value="<YOUR DATA>" />
</plugin>
```

# Inicializando aplicativo
Para iniciar o aplicativo em modo web (modo navegador), utilize o seguinte comando:

```sh
ionic server
```

Para rodar o aplicativo em um dispositivo android ou ios, é necessário realizar o seguinte comando:
```sh
ionic add platform android
ionic run android
```
ou

```sh
ionic add platform ios
ionic run ios
```
