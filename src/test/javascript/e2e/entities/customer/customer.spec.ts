import { browser, ExpectedConditions as ec } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { CustomerComponentsPage, CustomerUpdatePage } from './customer.page-object';

describe('Customer e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let customerUpdatePage: CustomerUpdatePage;
    let customerComponentsPage: CustomerComponentsPage;

    beforeAll(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Customers', async () => {
        await navBarPage.goToEntity('customer');
        customerComponentsPage = new CustomerComponentsPage();
        expect(await customerComponentsPage.getTitle()).toMatch(/storeApp.customer.home.title/);
    });

    it('should load create Customer page', async () => {
        await customerComponentsPage.clickOnCreateButton();
        customerUpdatePage = new CustomerUpdatePage();
        expect(await customerUpdatePage.getPageTitle()).toMatch(/storeApp.customer.home.createOrEditLabel/);
        await customerUpdatePage.cancel();
    });

    it('should create and save Customers', async () => {
        await customerComponentsPage.clickOnCreateButton();
        await customerUpdatePage.setFirstNameInput('firstName');
        expect(await customerUpdatePage.getFirstNameInput()).toMatch('firstName');
        await customerUpdatePage.setLastNameInput('lastName');
        expect(await customerUpdatePage.getLastNameInput()).toMatch('lastName');
        await customerUpdatePage.genderSelectLastOption();
        await customerUpdatePage.setEmailInput('email');
        expect(await customerUpdatePage.getEmailInput()).toMatch('email');
        await customerUpdatePage.setPhoneInput('phone');
        expect(await customerUpdatePage.getPhoneInput()).toMatch('phone');
        await customerUpdatePage.setAddressLine1Input('addressLine1');
        expect(await customerUpdatePage.getAddressLine1Input()).toMatch('addressLine1');
        await customerUpdatePage.setAddressLine2Input('addressLine2');
        expect(await customerUpdatePage.getAddressLine2Input()).toMatch('addressLine2');
        await customerUpdatePage.setCityInput('city');
        expect(await customerUpdatePage.getCityInput()).toMatch('city');
        await customerUpdatePage.setCountryInput('country');
        expect(await customerUpdatePage.getCountryInput()).toMatch('country');
        await customerUpdatePage.userSelectLastOption();
        await customerUpdatePage.save();
        expect(await customerUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(async () => {
        await navBarPage.autoSignOut();
    });
});
