<h1>Assignment App by Mathias et Narindra - section frontend</h1>
<strong>url : https://frontmbds2021angular.herokuapp.com/</strong>
<hr>
  <h2>Décomposition modulaire de l'application</h2>
  <ul>
    <li>L'application a été décomposée en plusieurs sous-modules pour pouvoir effectuer un lazy loading</li>
    <li>Le lazy loading permet de ne charger que les composants que l'utilisateur a besoin d'afficher</li>
    <li>La référence au lazy loading est expliqué dans cette page https://angular.io/guide/lazy-loading-ngmodules</li>
    <li>Pour pouvoir charger un composant un lazy loading quand on accède à une route , on utilise loadChildren comme dans app/app-routing.module.ts ligne 12 ou 20 : 
      ```
      {
          path: 'auth',
          canLoad: [AuthModuleGuard],
          loadChildren: () => import('./auth/auth.module').then(data => data.AuthModule),
      }
      ```
    <li>Voici la liste des modules qu'on a utilisé pour cette application : 
      <ul>
        <li>Assignments pour les devoirs <strong>(app/assignments/assignments.module.ts)</strong> avec ses routes <strong>(app/assignments/assignments-routing.module.ts)</strong></li>
        <li>Dashboard pour le tableau de bord <strong>(app/dashboard/dashboard.module.ts)</strong> avec ses routes <strong>(app/dashboard/dashboard-routing.module.ts)</strong></li>
        <li>Eleves pour la gestion des élèves <strong>(app/Eleves/eleves.module.ts)</strong> avec ses routes <strong>(app/Eleves/eleves-routing.module.ts)</strong></li>
        <li>Matières pour la gestion des Matières <strong>(app/Matieres/matieres.module.ts)</strong> avec ses routes <strong>(app/Matieres/matieres-routing.module.ts)</strong></li>
      </ul>
    </li>
  </ul>
<hr>
<h2>Login et inscription</h2>
<ul>
  <li>On a utilisé des tokens jwt venant de Nodejs suivant ce tuto que vous avez proposé https://www.freecodecamp.org/news/securing-node-js-restful-apis-with-json-web-tokens-9f811a92bb52/</li>
  <li>On a utilisé des routeGuard côté angular pour bloquer l'accès des utilisateurs à certaines pages :
    <ul>
      <li>Les route guard ce sont des services Angular qui permettent d'éviter qu'un utilisateur arrive sur une route sans autorisation</li>
      <li>Bien sur on a sécurisé les ressources au niveau backend en plus des routes guard côté frontend vu que l'utilisateur final peut désactiver ou modifier les fichiers clients</li>
      <li>On a créé deux routes guard : </li>
        <li>Structure des route guard 
        <ul>
          <li>Les routes guard sont composé comme ci : 
          ```
           export class AdminGuard implements CanActivate{
             constructor(private readonly authService: AuthService,
                         private readonly router: Router) {}
             canActivate(route: ActivatedRouteSnapshot,
                         state: RouterStateSnapshot){
               return this.authService.isAdmin() ? true :  this.router.navigate(['/main']);
             }
           }
           ```
           <ul>
            <li>Le service guard doit implémenter la classe CanActivate</li>
            <li>dans canActivate on définit la règle qui va permettre à l'utilisateur d'accéder à la route protégée</li>
            <li>et on redirige vers la page souhaitée quand l'utilisateur n'a pas accès.</li>
           </ul>
          </li>
          <li>Admin route guard (app/shared/Guards/AdminGuard) afin de bloquer les routes qui ne peuvent être vu que par l'administrateur</li>
          <li></li>
        </ul></li>
    </ul>
  </li>

  <li></li>
</ul>
