import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { NivelEducacional } from 'src/app/model/nivel-educacional';
import { Usuario } from 'src/app/model/usuario';
/*
import jsQR, { QRCode } from 'jsqr';
import { Asistencia } from 'src/app/interfaces/asistencia';
*/

@Component({
  selector: 'app-qr',
  templateUrl: './qr.page.html',
  styleUrls: ['./qr.page.scss'],
})
export class QrPage implements OnInit {

  public usuario: Usuario;
  /*
  public asistencia: Asistencia | undefined = undefined;
  */
  public escaneando = false;
  public datosQR: string = '';

  constructor(private activatedRoute: ActivatedRoute, private router: Router) { 
    this.usuario = new Usuario('','','','','','','',
      NivelEducacional.findNivelEducacionalById(1)!, undefined);
      this.usuario.cuenta = '';
      this.usuario.password = '';
    this.usuario.recibirUsuario(activatedRoute, router);
  }

  ngOnInit() {
  }

}
