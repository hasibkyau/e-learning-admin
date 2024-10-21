import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.scss']
})
export class PageListComponent implements OnInit {

  allPages: any[] = [
    {_id: 1, name: 'Career', slug: 'career'},
    {_id: 2, name: 'Contact Us', slug: 'contact-us'},
    {_id: 3, name: 'About Us', slug: 'about-us'},
    {_id: 4, name: 'Return & Refund Policy', slug: 'return-&-refund-policy'},
    {_id: 5, name: 'Privacy Policy', slug: 'privacy-policy'},
    {_id: 6, name: 'Terms and Conditions', slug: 'terms-and-conditions'},
    {_id: 7, name: 'Affiliate Information', slug: 'affiliate-Information'},


  ];

  constructor() { }

  ngOnInit(): void {
  }

}
