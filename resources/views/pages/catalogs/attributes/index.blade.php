@extends('layouts.app')

@section('content')

@component('layouts.default.breadcrumb')
    @slot('title')
        Atributos
    @endslot
    @slot('url')
        <li><a href="#">Catálagos</a></li>
        <li class="active">Atributos</li>
    @endslot
@endcomponent

<section class="box-typical">
    <header class="box-typical-header">
        <div class="tbl-row">
            <div class="tbl-cell tbl-cell-title">
                <h3>05 Atributos</h3>
            </div>

            <div class="tbl-cell tbl-cell-action-bordered">
                <a href="#" class="btn btn-inline"><i class="glyphicon glyphicon-plus"></i> Criar novo</a>
            </div>
        </div>
    </header>
    <div class="box-typical-body">
        <div class="table-responsive">
            <table id="table-edit" class="table table-hover">
                <thead>
                    <tr>
                        <th>Atributo - Coluna para importação</th>
                        <th width="200">Produtos vinculados</th>
                        <th class="tabledit-toolbar-column">Editar</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="tabledit-view-mode">
                            Gênero - grade-genero
                            <br>
                            <small>
                                Unissex,
                                Masculino,
                                Feminino
                            </small>
                        </td>
                        <td>
                            <span class="label label-default">1 produto vinculado</span>
                        </td>
                        <td style="white-space: nowrap; width: 1%;">
                            <div class="tabledit-toolbar btn-toolbar" style="text-align: left;">
                                <div class="btn-group btn-group-sm" style="float: none;"><button type="button" class="tabledit-edit-button btn btn-sm btn-default" style="float: none;"><span class="glyphicon glyphicon-pencil"></span></button><button type="button" class="tabledit-delete-button btn btn-sm btn-default" style="float: none;"><span class="glyphicon glyphicon-trash"></span></button></div>
                                <button type="button" class="tabledit-save-button btn btn-sm btn-success" style="display: none; float: none;">Save</button>
                                <button type="button" class="tabledit-confirm-button btn btn-sm btn-danger" style="display: none; float: none;">Confirm</button>
                                <button type="button" class="tabledit-restore-button btn btn-sm btn-warning" style="display: none; float: none;">Restore</button>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td class="tabledit-view-mode">
                            Gênero - grade-genero
                            <br>
                            <small>
                                Unissex,
                                Masculino,
                                Feminino
                            </small>
                        </td>
                        <td>
                            <span class="label label-default">1 produto vinculado</span>
                        </td>
                        <td style="white-space: nowrap; width: 1%;">
                            <div class="tabledit-toolbar btn-toolbar" style="text-align: left;">
                                <div class="btn-group btn-group-sm" style="float: none;"><button type="button" class="tabledit-edit-button btn btn-sm btn-default" style="float: none;"><span class="glyphicon glyphicon-pencil"></span></button><button type="button" class="tabledit-delete-button btn btn-sm btn-default" style="float: none;"><span class="glyphicon glyphicon-trash"></span></button></div>
                                <button type="button" class="tabledit-save-button btn btn-sm btn-success" style="display: none; float: none;">Save</button>
                                <button type="button" class="tabledit-confirm-button btn btn-sm btn-danger" style="display: none; float: none;">Confirm</button>
                                <button type="button" class="tabledit-restore-button btn btn-sm btn-warning" style="display: none; float: none;">Restore</button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <!--.box-typical-body-->
</section>
@endsection

@section('scripts')
    <script src="{{ asset('js/home.js') }}"></script>
@endsection
