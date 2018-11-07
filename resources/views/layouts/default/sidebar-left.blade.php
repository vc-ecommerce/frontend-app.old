<div id="vue-sidebar-menu-left" style="display:none">
  <sidebar-menu-left>
    <template>

      <li class="grey with-sub">
        <a href="{{ route('dashboard') }}">
          <span class="font-icon font-icon-dashboard"></span>
          <span class="lbl">Painel de Controle</span>
        </a>
      </li>

      <li class="brown with-sub">
        <span>
          <i class="fa fa-tags"></i>
          <span class="lbl">Catálago</span>
        </span>
        <ul>
          <li><a href="#"><span class="lbl">Departamentos</span></a></li>
          <li><a href="#"><span class="lbl">Produtos</span></a></li>
          <li><a href="#"><span class="lbl">Tipos de assinatura</span></a></li>
          <li><a href="#"><span class="lbl">Filtros</span></a></li>
          <li><a href="{{ route('catalogs.attributes.index') }}"><span class="lbl">Atributos</span></a></li>

          <li><a href="#"><span class="lbl">Opções</span></a></li>
          <li><a href="#"><span class="lbl">Marcas</span></a></li>
          <li><a href="#"><span class="lbl">Downloads</span></a></li>
          <li><a href="#"><span class="lbl">Comentários</span></a></li>
          <li><a href="#"><span class="lbl">Páginas de informações</span></a></li>

        </ul>
      </li>

      <li class="purple with-sub">
        <span>
          <i class="fa fa-puzzle-piece"></i>
          <span class="lbl">Extensões</span>
        </span>
        <ul>
          <li><a href="#"><span class="lbl">Marketplace</span></a></li>
          <li><a href="#"><span class="lbl">Extensões</span></a></li>
        </ul>
      </li>

      <li class="red with-sub">
        <span>
          <i class="fa fa-television"></i>
          <span class="lbl">Design</span>
        </span>
        <ul>
          <li><a href="#"><span class="lbl">Banners</span></a></li>
        </ul>
      </li>

      <li class="gold with-sub">
        <span>
          <i class="fa fa-shopping-cart"></i>
          <span class="lbl">Vendas</span>
        </span>
        <ul>
          <li><a href="#"><span class="lbl">Pedidos</span></a></li>
          <li><a href="#"><span class="lbl">Tipos de assinatura</span></a></li>
          <li><a href="#"><span class="lbl">Devoluções</span></a></li>

          <li class="grey with-sub">
            <span>
              <span class="lbl">Vale presentes</span>
            </span>
            <ul>
              <li><a href="#"><span class="lbl">Vale presentes</span></a></li>
              <li><a href="#"><span class="lbl">Temas</span></a></li>
            </ul>
          </li>

        </ul>
      </li>

      <li class="blue with-sub">
        <span>
          <i class="fa fa-users"></i>
          <span class="lbl">Clientes</span>
        </span>
        <ul>
          <li><a href="#"><span class="lbl">Clientes</span></a></li>
          <li><a href="#"><span class="lbl">Tipos de clientes</span></a></li>
          <li><a href="#"><span class="lbl">Aprovar clientes</span></a></li>
          <li><a href="#"><span class="lbl">Personalizar cadastro</span></a></li>
        </ul>
      </li>

      <li class="green with-sub">
        <span>
          <i class="fa fa-share-alt"></i>
          <span class="lbl">Marketing</span>
        </span>
        <ul>
          <li><a href="#"><span class="lbl">Marketing</span></a></li>
          <li><a href="#"><span class="lbl">Cupons</span></a></li>
          <li><a href="#"><span class="lbl">Informativo</span></a></li>
        </ul>
      </li>


      <li class="purple with-sub">
        <span>
        <i class="fa fa-cog"></i>
        <span class="lbl">Configurações</span>
        </span>
        <ul>
          <li>
            <a href="#">
              <span class="lbl">Gerenciar Lojas</span>
            </a>
          </li>

          <li v-if="isRoleAdmin" class="purple with-sub">
            <span>
            <span class="lbl">Gerenciar usuários</span>
            </span>
            <ul>
              <li><a href="{{ route('settings.users.index') }}"><span class="lbl">Gerenciar usuários</span></a></li>
              <li><a href="#"><span class="lbl">Grupos de usuários</span></a></li>
              <li><a href="#"><span class="lbl">API</span></a></li>
            </ul>
          </li>

          <li v-if="isRoleAdmin" class="purple with-sub">
            <span>
            <span class="lbl">Gerenciar Permissões</span>
            </span>
            <ul>
              <li><a href="{{ route('settings.roles.index') }}"><span class="lbl">Funções [Roles]</span></a></li>
            </ul>
            <ul>
                <li><a href="#"><span class="lbl">Permissões [Privileges]</span></a></li>
              </ul>
          </li>

          <li class="purple with-sub">
            <span>
              <span class="lbl">Dados auxiliares</span>
            </span>
            <ul>
              <li><a href="#"><span class="lbl">Situações de estoque</span></a></li>
              <li><a href="#"><span class="lbl">Situações de pedidos</span></a></li>
              <li class="purple with-sub">
                <span>
                  <span class="lbl">Devoluções</span>
                </span>
                <ul>
                  <li><a href="#"><span class="lbl">Situações</span></a></li>
                  <li><a href="#"><span class="lbl">Soluções</span></a></li>
                  <li><a href="#"><span class="lbl">Motivos</span></a></li>
                </ul>
              </li>

              <li><a href="#"><span class="lbl">Estados</span></a></li>
              <li><a href="#"><span class="lbl">Municípios</span></a></li>
            </ul>
          </li>

          <li class="purple with-sub">
            <span>
              <span class="lbl">Manutenção</span>
            </span>
            <ul>
              <li><a href="#"><span class="lbl">Backup / Restaurar</span></a></li>
              <li><a href="#"><span class="lbl">Log de erros</span></a></li>
            </ul>
          </li>


        </ul>
      </li>

      <li class="blue-dirty with-sub">
        <span>
        <i class="fa fa-bar-chart-o"></i>
        <span class="lbl">Relatórios</span>
        </span>
        <ul>
          <li><a href="#"><span class="lbl">Relatórios</span></a></li>
          <li><a href="#"><span class="lbl">Usuários online</span></a></li>
          <li><a href="#"><span class="lbl">Estatísticas</span></a></li>
        </ul>
      </li>
    </template>
  </sidebar-menu-left>
</div>
