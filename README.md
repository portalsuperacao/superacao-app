# Conhecimentos minimos
* NodeJS
* Typescript
* Angular 2
* Ionic 2
* Firebase

# Configurações basicas
O aplicativo foi desenvolvido na linguagem TypeScript com o framework Ionic 2
Para realizar a instalação do Ionic em sua máquina, você irá precisar do NodeJS com o NPM instalado em sua máquina. Após isso só é necessário realizar a instalação do Ionic em sua máquina com os seguintes comandos:
```nodejs
npm install -g ionic cordova
```

Para mais informações de instalação acesse a página do Ionic 2 oficial:
https://ionicframework.com/docs/

# Configurações iniciais
### 1. Firebase
Crie sua conta no [Firebase](!firebase.google.com) e faça seguinte configuração:`

```sh
$  cp src/config/environment.dev-template.ts src/config/environment.dev.ts
```
Edite o arquivo copiado e preencha com os dados do Firebase.

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

Ative o login do Facebook no Firebase:
1. No Firebase console, abra a seção Authentication.
2. Na guia Sign in method, ative o método de login Facebook e especifique o ID de aplicativo e o segredo de aplicativo que você obteve do Facebook.
3. Em seguida, certifique-se de que o URI de redirecionamento OAuth (por exemplo, my-app-12345.firebaseapp.com/__/auth/handler) esteja listado como um de seus URIs de redirecionamento OAuth na página de configurações do aplicativo do Facebook, no site Facebook for Developers, na configuração Product Settings > Facebook Login.

### 3. Configurar Push Notification
Para realizar os push notification no app, é necessário realizar uma pequena configuração. Para o serviço tambem utilizamos o FCM (Firebase Cloud Message), e para isso, você precisará do "Sender ID" da sua conta firebase (este dado você pode pegar no console do firebase). No mesmo arquivo XML altere os seguintes dados

```xml
<plugin name="phonegap-plugin-push" spec="~1.9.2">
    <variable name="SENDER_ID" value="<YOUR DATA>" />
</plugin>
```

Abra o arquivo package.json e modifique também o seguinte objeto:
```json
    {
      "variables": {
        "SENDER_ID": "<YOUR DATA>"
      },
      "locator": "phonegap-plugin-push"
    }
```

### 4. Geração dos trios
Os trios ainda não são gerados automaticamente, e para fazer o relacionamento entre eles, é necessário o cadastro de um usuário para adquirir, o tipo e o ID dele. Para conseguir esses dados só é necessário cadastrar o usuário. Por padrão o tipo de usuário é setado como "Normal", por isso no próprio console do firebase troque o usuário para o tipo desejado (Superador, Anjo, Arcanjo ou Normal). Após isso abra os seguintes arquivo:

```sh
superacao-app/src/pages/trinity/overcomer/overcomer.ts
superacao-app/src/pages/trinity/angel/angel.ts
```

Após isso encontre a função getTrinityService() e nele, troque os seguintes dados de acordo com o usuário que você deseja relacionar:

##### Superador

```typescript
  function getTrinityService() {
        let trinity = {
          overcomer : "",
          angel: "<UID DO ANJO DO FIREBASE>",
          archangel: "<UID DO ARCANJO DO FIREBASE>"
        };
        return trinity;
      }
```

##### Anjo
```typescript
  function getTrinityService() {
        let trinitys = [{
          overcomer : "<UID DO SUPERADOR DO FIREBASE>",
          angel: "",
          archangel: "<UID DO ARCANJO DO FIREBASE>"
        },
        {
          overcomer : "<UID DO ARCANJO DO SUPERADOR>",
          angel: "",
          archangel: "<UID DO SUPERADOR DO FIREBASE>"
        }];

        return trinitys;
      }
```
##### Observação
O do componente "Overcomer" (Superador), só aceita um Objeto simples, pois ele só irá possuir um trio. Já o o componente "Angel" (Anjo), possuí um Array de Objetos, pois vai possuír mais de um trio.
**Não é obrigatorio colocar o uid do componente** (Exemplo, se você esta no componente do Superador, não vai precisar colocar o Uid dele mesmo, por isso no exemplo acima eles estão em branco)

# Inicializando aplicativo

O aplicativo está configurado com Docker. Instale previamente o `docker` e `docker-compose` em seu sistema, em seguida:

```docker
docker-compose build
docker-compose up
```

# Contributors

- [FIAP University](https://www.fiap.com.br) for supporting the development of mobile app
- Gabriela Besser - Founder, product design, UI/UX
- Diego Garcia - [@diegodsgarcia](http://github.com/diegodsgarcia)

# License

GNU GPL v3.0
