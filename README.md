<h1>Assignment App by Mathias et Narindra - section frontend</h1>
<strong>url : https://frontmbds2021angular.herokuapp.com/</strong>
<hr>
    <p>Pour lancer il suffit de faire npm install puis ng serve 
     compte de test : nouveauCompte2021 - test</p>
     <p>La vidéo de démo se trouve dans app/demo_angular.mkv</p>
<hr>
<h3>Fonctionnalités clés</h3>
<ul>
  <li>Ajout de gestion de login et de password à l'aide de Json Web Tokens (JWT) avec collection d'utilisateurs au niveau du backend</li>
  <li>Suppression - ajout et modification des assignments</li>
  <li>Une propriété remarque (en wysiwig https://github.com/sibiraj-s/ngx-editor), la note , la matière ( mapping grâce à une collection mongo Matiere ) , l'élève ( mapping grâce à une collection mongo Eleves ) ont été ajoutés aux assignments</li>
  <li>Une gestion des matières (création , suppression et liste des matières ) , avec upload de l'image du professeur ( grâce à https://www.npmjs.com/package/ngp-image-picker et le type formData pour envoyer des fichiers via http) et choix de l'icone de la matière (grâce à https://www.npmjs.com/package/ngx-icon-picker)</li>
  <li>Une gestion des élèves ( création , suppression et édition des élèves)</li>
  <li>Drag and drop (https://material.angular.io/cdk/drag-drop/overview) sur la liste des assignments pour pouvoir mettre un assignment rendu ou pas rendu , appui sur bouton , action depuis la fiche du devoir afin de mettre le devoir sous rendu ou pas rendu , on a développé l'application de telle sorte que l'utilisateur puisse annuler le rendu du devoir sans devoir toucher à la note ou à la remarque, mais un utilisateur peut uniquement rendre un devoir manuellement en donnant une note et une remarque </li>
  <li>Formulaire stepper avec validation pour la création des devoirs (https://material.angular.io/components/stepper/overview)</li>
  <li>Recherche sur autocomplete plusieurs matières sur la liste des assignments  (https://material.angular.io/components/chips/overview et https://material.angular.io/components/autocomplete/overview)</li>
  <li>Un tableau de bord
    <ul>
      <li>Devoirs rendus par mois (https://swimlane.github.io/ngx-charts/#/ngx-charts/bar-vertical)</li>
      <li>Devoirs rendus par années (https://swimlane.github.io/ngx-charts/#/ngx-charts/pie-chart)</li>
      <li>Devoirs rendus par jour / nombre de matière créées par jour / nombre d'élèves créés par jour (https://swimlane.github.io/ngx-charts/#/ngx-charts/line-chart)</li>
    </ul>
  </li>
</ul>
<hr>
  <h2>Décomposition modulaire de l'application</h2>
  <ul>
    <li>L'application a été décomposée en plusieurs sous-modules pour pouvoir effectuer un lazy loading</li>
    <li>Le lazy loading permet de ne charger que les composants que l'utilisateur a besoin d'afficher</li>
    <li>La référence au lazy loading est expliqué dans cette page https://angular.io/guide/lazy-loading-ngmodules</li>
    <li>Pour pouvoir charger un composant un lazy loading quand on accède à une route , on utilise loadChildren comme dans app/app-routing.module.ts ligne 12 ou 20 : 
    
      {
          path: 'auth',
          canLoad: [AuthModuleGuard],
          loadChildren: () => import('./auth/auth.module').then(data => data.AuthModule),
      }
<hr>
    <li>Voici la liste des modules qu'on a créé pour cette application : 
      <ul>
        <li>Assignments pour les devoirs <strong>(app/assignments/assignments.module.ts)</strong> avec ses routes <strong>(app/assignments/assignments-routing.module.ts)</strong></li>
        <li>Dashboard pour le tableau de bord <strong>(app/dashboard/dashboard.module.ts)</strong> avec ses routes <strong>(app/dashboard/dashboard-routing.module.ts)</strong></li>
        <li>Eleves pour la gestion des élèves <strong>(app/Eleves/eleves.module.ts)</strong> avec ses routes <strong>(app/Eleves/eleves-routing.module.ts)</strong></li>
        <li>Matières pour la gestion des Matières <strong>(app/Matieres/matieres.module.ts)</strong> avec ses routes <strong>(app/Matieres/matieres-routing.module.ts)</strong></li>
        <li>Auth pour les pages login et authentification <strong>(app/auth/auth.module.ts)</strong> avec ses routes <strong>(app/auth/auth.routing.module.ts)</strong></li>
      </ul>
    </li>
  </ul>
<hr>
<h2>Login, inscription et garde d'accès aux routes</h2>
<ul>
  <li>On a utilisé des tokens jwt venant de Nodejs suivant ce tuto que vous avez proposé https://www.freecodecamp.org/news/securing-node-js-restful-apis-with-json-web-tokens-9f811a92bb52/</li>
  <li>On a utilisé des routeGuards côté angular pour bloquer l'accès des utilisateurs à certaines pages https://angular.io/api/router/CanActivate:
      <li>Les route guard ce sont des services Angular qui permettent d'éviter qu'un utilisateur arrive sur une route sans autorisation</li>
      <li>Bien sur on a sécurisé les ressources au niveau backend en plus des routes guard côté frontend vu que l'utilisateur final peut désactiver ou modifier les fichiers clients</li>
      <li>On a créé deux routes guard :
        <ul>
          <li><strong>Admin route guard</strong> (app/shared/Guards/AdminGuard) afin de bloquer les routes qui ne peuvent être vu que par l'administrateur ( exemple : app/assignments/assignments-routing.module.ts ligne 27)</li>
          <li><strong>Auth guard</strong> (app/auth/auth-module.guard.ts) pour bloquer l'accès aux pages login et inscription quand l'utilisateur est connecté ( exemple : app/auth/auth.routing.module.ts)</li>
          <li><strong>AuthModuleGuard</strong> (app/shared/Guards/AuthGuard) afin de bloquer les autres routes et de les autoriser uniquement aux utilisateurs connectés </li>
        </ul>
      </li>
      <li>Structure des route guard 
        <ul>
          <li>Les routes guard sont composés comme ci : </li>
          
           export class AdminGuard implements CanActivate{
             constructor(private readonly authService: AuthService,
                         private readonly router: Router) {}
             canActivate(route: ActivatedRouteSnapshot,
                         state: RouterStateSnapshot){
               return this.authService.isAdmin() ? true :  this.router.navigate(['/main']);
             }
           }
<hr>
            <li>Le service guard doit implémenter la classe CanActivate(pour les composants) ou CanLoad(pour les modules) </li>
            <li>dans la fonction implémentée de l'interface on définit la règle qui va permettre à l'utilisateur d'accéder à la route protégée</li>
            <li>et on redirige vers la page souhaitée quand l'utilisateur n'a pas accès.</li>
        </ul>  
      </li>
      <li>On a utilisé localStorage pour pouvoir stocker le token jwt côté client : https://firstclassjs.com/persist-data-using-local-storage-and-angular/ 
        <ul>
          <li>le localStorage est un dictionnaire stocké dans la mémoire du navigateur , il suit le modèle clé valeur</li>
          <li>localStorage.getItem('item') pour prendre un élément (exemple : app/shared/HttpServices/auth.service.ts ligne 17 ) </li>
          <li>localStorage.setItem('cle',valeur) pour changer le contenu du localStorage correspondant à la clé donnée (exemple : app/shared/HttpServices/auth.service.ts ligne 23 )</li>
        </ul>
      </li>
</ul>
<hr>
<h2>Interception sur les Web services</h2>
<ul>
  <li>Pour centraliser le contrôle des erreurs d'accès et de l'attachement automatique des tokens à chaque requête, on a utilisé le composant injectable HttpInterceptor (https://ultimatecourses.com/blog/intro-to-angular-http-interceptors)</li>
  <li>Les interceptors permettent d'intercepter et de modifier les requêtes entrantes et sortantes</li>
  <li>Dans le projet j'ai utilisé un afin de rediriger sur le login quand une erreur d'autorisation est detectée (403 ou 401) (app/shared/Interceptors/Auth.interceptor.ts) ce qui peut signifier l'expiration du token . </li>
  <li>J'ai utilisé un autre interceptor (app/shared/Interceptors/Token.interceptor.ts) pour coller le token à l'header de chaque requête</li>
</ul>
<hr>
<h2>Ajout d'images</h2>
<ul>
  <li>Pour l'ajout de l'image , une fois que l'image est obtenue via l'imagepicker, on a utilisé form-data afin d'envoyer les données au niveau du serveur où ils seront traitées</li>
  <li>FormData c'est un objet qui peut contenir des données de type Blob et qu'on donne à la fonction post de HttpClient (https://www.techiediaries.com/angular-formdata/) , on l'a utilisé dans le service app/shared/HttpServices/matieres.service.ts ligne 16</li>
  <li>Dans le readme.md de la partie backend  on va expliquer l'architecture pour ce qui est des fichiers</li>
</ul>
<hr>
<h2>Tableau de bord</h2>
<ul>
  <li>Pour ce qui est du tableau de bord , on a juste utilisé la librairie ngx-charts (https://swimlane.github.io/ngx-charts/#/ngx-charts/bar-vertical)</li>
  <li>Pour les liens des exemples qu'on a utilisé afin de créer notre dashboard , on les a déja tous cités au début de ce document.</li>
</ul>
<hr>
<h2>Les formControl et les formGroup (https://angular.io/guide/reactive-forms)</h2>
<ul>
  <li>Pour la validation de nos formulaires on a utilisé les formControl et les formGroup au niveau du composant afin de faciliter l'affichage des messages d'erreur et le blocage du bouton valider en cas d'informations manquantes</li>
  <li>Pour pouvoir utiliser les formGroup on doit importer le module ReactiveFormsModule</li>
  <li>Les formGroup sont comme des groupes de formulaires virtuels qu'on donne à nos formulaires</li>
  <li>un FormGroup est composé de plusieurs FormControl (exemple dans app/Matieres/liste-matiere/liste-matiere.component.ts ligne 30 )</li>
  
    formulaire: FormGroup = new FormGroup({
      nomProf: new FormControl('',Validators.required),
      nomMatiere: new FormControl('',Validators.required),
      icone: new FormControl('warning',Validators.required),
      image: new FormControl(null,Validators.required),
    });   
<hr>
  <li>Un FormControl est instancié avec sa valeur par défaut et avec une liste ou un validateur qui génèrera les messages d'erreur après</li>
  <li>puis on lie le formGroup au composant html form et les formControl avec les composants input au niveau de l'affichage (exemple : app/Matieres/liste-matiere/liste-matiere.component.html ligne 5)</li>
</ul>
